import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/model/Role';
import { User } from 'src/model/User';
import { UserService } from '../clients/user/user.service';
import { PermissionService } from '../clients/permission/permission.service';

type RoleForSection = {
  section?: string;
  global?: string;
};

@Injectable()
export class ValidationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
  ) {}

  // check
  private async roleForSection(userRoles: Role[], sectionId: string): Promise<RoleForSection> {
    const sectionRole = userRoles.find((role) => role.section.id === sectionId);
    const globalRole = userRoles.find((role) => role.section.name === 'ALL');

    return {
      section: sectionRole.id,
      global: globalRole.id,
    };
  }

  // check if the user is a global admin
  private async isAdmin(userId: string): Promise<boolean> {
    const { data: isAdminData } = await this.userService.userIsAdmin({ userId: userId });
    return isAdminData.admin;
  }

  // check if the user is a section admin
  private async isSectionAdmin(userId: string, section: string): Promise<boolean> {
    const { data: isAdminData } = await this.userService.userIsAdmin({ userId, section });
    return isAdminData.admin;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: { user?: User } = context.switchToHttp().getRequest();
    const action = this.reflector.get<string[]>('protect-action', context.getHandler());

    // if there is no permission decorator on the request, then
    // the guard should not run its checks
    if (!action) return true;

    // if there is permission decorator, the user needs to be logged in
    if (!request.user) return false;

    // if user is global admin, they can do the action
    const isAdmin = await this.isAdmin(request.user.id);
    if (isAdmin) return true;

    // get action info
    const { data: actionData } = await this.permissionService.permissionGet({ action: action[0] });
    if (!actionData) return false;

    const roles = await this.roleForSection(request.user.roles, actionData.action.section);

    // if the user is section admin, they can do the action
    const isSectionAdmin = await this.isSectionAdmin(request.user.id, actionData.action.section);
    if (isSectionAdmin) return true;

    const { data: isPermittedData } = await this.permissionService.permissionIsPermitted({
      action: actionData.action.id,
      roles,
    });

    return isPermittedData.permitted;
  }
}
