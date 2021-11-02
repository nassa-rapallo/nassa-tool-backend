import { TokenDestroyResponse } from './responses/TokenDestroyResponse';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TOKEN_CREATE, TOKEN_DECODE } from './messages/command';
import { CREATE, DECODE } from './messages/response';
import { TokenResponse } from './responses/TokenResponse';
import { TokenDataResponse } from './responses/TokenDataResponse';
import { UserTokenService } from './services/user-token.service';

@Controller()
export class UserTokenController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @MessagePattern('token_hello')
  tokenHello(): string {
    console.log('hello');
    return 'hello token';
  }

  @MessagePattern(TOKEN_CREATE)
  async createToken(
    @Payload() data: { userId: string },
  ): Promise<TokenResponse> {
    console.log('CREATE-DATA', data);

    if (!data || !data.userId)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE.BAD_REQUEST,
        token: null,
      };

    try {
      console.log('CREATE-TRY');
      const createResult = await this.userTokenService.createToken(data.userId);

      console.log('CREATE-RESULT', createResult);
      return {
        status: HttpStatus.CREATED,
        message: CREATE.SUCCESS,
        token: createResult.token,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE.BAD_REQUEST,
        token: null,
      };
    }
  }

  @MessagePattern(TOKEN_DECODE)
  async decodeToken(
    @Payload() data: { token: string },
  ): Promise<TokenDataResponse> {
    const tokenData = await this.userTokenService.decodeToken({
      token: data.token,
    });

    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? DECODE.SUCCESS : DECODE.UNAUTHORIZED,
      data: tokenData,
    };
  }

  @MessagePattern('token_destroy')
  public async destroyToken(data: {
    userId: string;
  }): Promise<TokenDestroyResponse> {
    return {
      status: data && data.userId ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message:
        data && data.userId
          ? (await this.userTokenService.deleteTokenForUserId(data.userId)) &&
            'token_destroy_success'
          : 'token_destroy_bad_request',
      errors: null,
    };
  }
}
