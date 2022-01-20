import { firstValueFrom } from 'rxjs';
import { CanActivate, Inject, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { PERMISSION_SERVICE, TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { USER_IS_ADMIN, USER_GET } from 'src/clients/user/commands';
import { Permission } from 'src/shared/Permission';
import { Role } from 'src/model/Role';
import * as UserResponses from 'src/modules/user/response';
import * as UserDtos from 'src/modules/user/dto';
import { User } from 'src/model/User';
import { PERMISSION_IS_PERMITTED } from 'src/clients/permission/commands';
import { IsPermittedResponse } from 'src/modules/permission/response/IsPermittedResponse';
import { PermissionIsPermittedDto } from 'src/modules/permission/dto/PermissionIsPermittedDto';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionServiceClient: ClientProxy,
  ) {}

  private async roleForSection(userId: string, permission: Permission): Promise<Role | undefined> {
    const userSearchResponse = await firstValueFrom(
      this.userServiceClient.send<UserResponses.UserGet, UserDtos.UserIdDto>(USER_GET, {
        id: userId,
      }),
    );

    if (!userSearchResponse.data.user) return undefined;

    return userSearchResponse.data.user.roles.find((role) => role.section === permission.section);
  }

  private async isAdmin(user: User): Promise<boolean> {
    const isGlobalAdminResponse = await firstValueFrom(
      this.userServiceClient.send<UserResponses.UserIsAdmin, UserDtos.IsAdminDto>(USER_IS_ADMIN, {
        userId: user.id,
      }),
    );

    return isGlobalAdminResponse.data.admin;
  }

  private async isSectionAdmin(userId: string, section: string): Promise<boolean> {
    const isSectionAdminResponse = await firstValueFrom(
      this.userServiceClient.send<UserResponses.UserIsAdmin, UserDtos.IsAdminDto>(USER_IS_ADMIN, {
        userId,
        section,
      }),
    );

    return isSectionAdminResponse.data.admin;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const permission = this.reflector.get<Permission[]>('permission', context.getHandler());

    // if there is no permission decorator on the request, then
    // the guard should not run its checks
    if (!permission) return true;

    // if there is permission decorator, the user needs to be logged in
    if (!request.user) return false;

    const isAdmin = await this.isAdmin(request.user.id);
    if (isAdmin) return true;

    const isSectionAdmin = await this.isSectionAdmin(request.user.id, permission[0].section);
    if (isSectionAdmin) return true;

    const role = await this.roleForSection(request.user.id, permission[0]);

    if (!role) return false;

    const isPermitted = await firstValueFrom(
      this.permissionServiceClient.send<IsPermittedResponse, PermissionIsPermittedDto>(
        PERMISSION_IS_PERMITTED,
        {
          role: role.id,
          section: permission[0].section,
          action: permission[0].action,
        },
      ),
    );

    return isPermitted.data.permitted;
  }
}
