import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { TOKEN_CREATE } from 'src/clients/token/commands';
import { USER_SEARCH_BY_CREDENTIALS } from 'src/clients/user/commands';
import { isOk } from 'src/lib/responseCode';
import { LoginUserDto } from 'src/model/auth/dto/LoginUserDto';
import { LoginUserResponse } from 'src/model/auth/response/LoginUserResponse';
import { TokenCreateResponse } from 'src/model/auth/response/TokenCreateResponse';
import { UserSearchResponse } from 'src/model/user/response/UserSearchResponse';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginUserResponse,
  })
  async loginUser(
    @Body() loginRequest: LoginUserDto,
  ): Promise<LoginUserResponse> {
    const getUserResponse: UserSearchResponse = await firstValueFrom(
      this.userServiceClient.send(USER_SEARCH_BY_CREDENTIALS, loginRequest),
    );

    if (!isOk(getUserResponse.status))
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const createTokenResponse: TokenCreateResponse = await firstValueFrom(
      this.tokenServiceClient.send(TOKEN_CREATE, {
        userId: getUserResponse.user.id,
      }),
    );

    return {
      message: 'login_success',
      data: {
        token: createTokenResponse.token,
      },
      errors: null,
    };
  }
}
