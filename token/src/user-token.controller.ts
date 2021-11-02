import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TOKEN_CREATE } from './messages/command';
import { CREATE } from './messages/response';
import { TokenResponse } from './responses/token-response';
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
}
