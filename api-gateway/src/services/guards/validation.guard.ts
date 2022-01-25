import { CanActivate, Inject, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/shared/Permission';
import { Role } from 'src/model/Role';
import { User } from 'src/model/User';
import { UserService } from '../clients/user/user.service';
import { PermissionService } from '../clients/permission/permission.service';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject() private readonly userService: UserService,
    @Inject() private readonly permissionService: PermissionService,
  ) {}

  private async roleForSection(userId: string, permission: Permission): Promise<Role | undefined> {
    const { data: userData } = await this.userService.userGet({ id: userId });

    if (!userData) return undefined;

    return userData.user.roles.find((role) => role.section.id === permission.section);
  }

  private async isAdmin(user: User): Promise<boolean> {
    const { data: isAdminData } = await this.userService.userIsAdmin({ userId: user.id });
    return isAdminData.admin;
  }

  private async isSectionAdmin(userId: string, section: string): Promise<boolean> {
    const { data: isAdminData } = await this.userService.userIsAdmin({ userId, section });

    return isAdminData.admin;
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

    const { data: isPermittedData } = await this.permissionService.permissionIsPermitted({
      role: role.id,
      section: permission[0].section,
      action: permission[0].action,
    });

    return isPermittedData.permitted;
  }
}
