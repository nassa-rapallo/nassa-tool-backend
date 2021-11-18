import { TokenDestroyResponse } from '../responses/TokenDestroyResponse';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TOKEN_CREATE, TOKEN_DECODE, TOKEN_DESTROY } from '../messages/command';
import { CREATE, DECODE, DESTROY } from '../messages/response';
import { TokenResponse } from '../responses/TokenResponse';
import { TokenDataResponse } from '../responses/TokenDataResponse';
import { UserTokenService } from '../services/user-token.service';

@Controller()
export class UserTokenController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @MessagePattern('hello_token')
  tokenHello(): string {
    return 'Hello from Token';
  }

  @MessagePattern(TOKEN_CREATE)
  async createToken(
    @Payload() data: { userId: string },
  ): Promise<TokenResponse> {
    // WRONG DATA
    if (!data || !data.userId)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE.BAD_REQUEST,
        data: null,
        errors: ['wrong-data'],
      };

    try {
      const createResult = await this.userTokenService.createToken(data.userId);

      // SUCCESS
      return {
        status: HttpStatus.CREATED,
        message: CREATE.SUCCESS,
        data: { token: createResult.token },
      };
    } catch (e) {
      // ERROR FROM JWT SIGNING
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE.BAD_REQUEST,
        data: null,
        errors: [e.driverError.detail],
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

  @MessagePattern(TOKEN_DESTROY)
  public async destroyToken(data: {
    userId: string;
  }): Promise<TokenDestroyResponse> {
    try {
      await this.userTokenService.deleteTokenForUserId(data.userId);

      return {
        status: HttpStatus.OK,
        message: DESTROY.SUCCESS,
        data: true,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: DESTROY.FAILURE,
        data: false,
        errors: [e.driverError.detail],
      };
    }
  }
}
