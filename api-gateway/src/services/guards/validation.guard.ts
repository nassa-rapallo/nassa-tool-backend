import { firstValueFrom } from 'rxjs';
import {
  CanActivate,
  Inject,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { PERMISSION_SERVICE, TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { Permission } from 'src/lib/Permission';
import { Role } from 'src/modules/user/model/Role';
import { User } from 'src/modules/user/model/User';
import { USER_IS_ADMIN } from 'src/clients/user/commands';
import { Response } from 'src/lib/Response';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(PERMISSION_SERVICE)
    private readonly permissioneServiceClient: ClientProxy,
  ) {}

  private roleForSection(user: User, permission: Permission): Role | undefined {
    return user.roles.find((role) => role.section === permission.section);
  }

  private async isAdmin(user: User): Promise<boolean> {
    const isGlobalAdminResponse = await firstValueFrom<
      Response<{ admin: boolean }>
    >(this.userServiceClient.send(USER_IS_ADMIN, { user }));

    return isGlobalAdminResponse.data.admin;
  }

  private async isSectionAdmin(user: User, section: string): Promise<boolean> {
    const isSectionAdminResponse = await firstValueFrom<
      Response<{ admin: boolean }>
    >(this.userServiceClient.send(USER_IS_ADMIN, { user, section }));

    return isSectionAdminResponse.data.admin;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const permission = this.reflector.get<Permission[]>(
      'permission',
      context.getHandler(),
    );

    if (!request.user) return false;

    const isAdmin = await this.isAdmin(request.user);
    if (isAdmin) return true;

    const isSectionAdmin = await this.isSectionAdmin(
      request.user,
      permission[0].section,
    );
    if (isSectionAdmin) return true;

    const role = this.roleForSection(request.user, permission[0]);

    const isPermitted = await firstValueFrom<boolean>(
      this.permissioneServiceClient.send('permission_is_permitted', {
        roleId: role.id,
        section: permission[0].section,
        action: permission[0].action,
      }),
    );

    return isPermitted;
  }
}
