import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../clients/user/user.service';

@Injectable()
export class SameUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const sameUserGuard = this.reflector.get<boolean>('same-user', context.getHandler());
    if (!sameUserGuard) return true;

    const data = request.data;
    const user = request.user;

    if (!data.id || !user) return false;

    const { data: isAdminData } = await this.userService.userIsAdmin({ id: user.id });

    // if is a global admin, the user can do whatever they want
    if (isAdminData.admin) return true;
    // not admin, not same user => what are you trying to do strauss?
    if (data.id != request.user.id) return false;
  }
}
