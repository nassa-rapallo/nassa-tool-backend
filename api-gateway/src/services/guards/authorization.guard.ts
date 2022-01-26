import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../clients/token/token.service';
import { UserService } from '../clients/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>('secured', context.getHandler());

    if (!secured) return true;

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await this.tokenService.tokenDecode({
      token: request.headers.authorization,
    });

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: undefined,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await this.userService.userGet({ id: userTokenInfo.data.userId });

    request.user = userInfo.data.user;
    return true;
  }
}
