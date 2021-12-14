import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { TOKEN_DECODE } from 'src/clients/token/commands';
import { USER_SEARCH_BY_ID } from 'src/clients/user/commands';
import { TOKEN_SERVICE, USER_SERVICE } from 'src/clients';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    if (!secured) return true;

    const request = context.switchToHttp().getRequest();
    const userTokenInfo = await firstValueFrom(
      this.tokenServiceClient.send(TOKEN_DECODE, {
        token: request.headers.authorization,
      }),
    );

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        userTokenInfo.status,
      );
    }

    const userInfo = await firstValueFrom(
      this.userServiceClient.send(USER_SEARCH_BY_ID, userTokenInfo.data.userId),
    );

    request.user = userInfo.user;
    return true;
  }
}
