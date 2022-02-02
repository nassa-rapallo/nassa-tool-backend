import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/model/User';
import { UserService } from '../clients/user/user.service';
import { PermissionService } from '../clients/permission/permission.service';
import { RoleService } from '../clients/role/role.service';

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService,
  ) {}

  // check if the user is a global admin
  private async isAdmin(user: User): Promise<boolean> {
    const { data: isAdminData } = await this.userService.userIsAdmin({ id: user.id });

    const { data: globalAdmin } = await this.roleService.roleGetGlobalAdmin();
    const isGlobalAdmin = user.roles.find((role) => role.id === globalAdmin.role.id) ? true : false;

    return isAdminData.admin || isGlobalAdmin;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { user?: User } = context.switchToHttp().getRequest();
    const action = this.reflector.get<string>('protect-action', context.getHandler());

    // if there is no permission decorator on the request, then
    // the guard should not run its checks
    if (!action) return true;

    // if there is permission decorator, the user needs to be logged in
    if (!request.user) return false;

    // if user is global admin, they can do the action
    const isAdmin = await this.isAdmin(request.user);
    if (isAdmin) return true;

    // get action info
    const { data: actionData } = await this.permissionService.permissionGetByAction({
      actionId: action,
    });
    if (!actionData) return true;

    const { data: isPermittedData } = await this.permissionService.permissionIsPermitted({
      actionId: action,
      userRoles: request.user.roles,
    });

    return isPermittedData.permitted;
  }
}
