import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TokenResponse } from './responses/token-response';
import { UserTokenService } from './services/user-token.service';

@Controller()
export class AppController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @MessagePattern('token_create_token')
  async createToken(data: { userId: string }): Promise<TokenResponse> {
    if (!data || !data.userId)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        token: null,
      };

    try {
      const createResult = await this.userTokenService.createToken(data.userId);

      return {
        status: HttpStatus.CREATED,
        message: 'token_create_success',
        token: createResult.token,
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'token_create_bad_request',
        token: null,
      };
    }
  }
}
