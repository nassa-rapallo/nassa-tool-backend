import { Body, Controller, HttpStatus, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { TOKEN_CREATE, TOKEN_DESTROY } from 'src/clients/token/commands';
import { USER_SEARCH_BY_CREDENTIALS, USER_GET } from 'src/clients/user/commands';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Authorization } from 'src/services/decorators/authorization.decorator';
import { LoginUserResponse } from 'src/modules/auth/response';
import { LoginUserDto } from 'src/modules/auth/dto';
import * as UserResponses from 'src/modules/user/response';
import { UserCredentialsDto, UserIdDto } from 'src/modules/user/dto';
import { TokenDestroyResponse, TokenResponse } from 'src/modules/token/responses';
import { CreateTokenDto, DestroyTokenDto } from 'src/modules/token/dto';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  @ApiOperation({ description: 'User login operation' })
  @ApiBody({ type: [LoginUserDto] })
  @ApiOkResponse({
    type: LoginUserResponse,
    description: 'Login successful',
  })
  async loginUser(@Body() loginRequest: LoginUserDto): Promise<LoginUserResponse> {
    const getUserResponse = await firstValueFrom(
      this.userServiceClient.send<UserResponses.UserGet, UserCredentialsDto>(
        USER_SEARCH_BY_CREDENTIALS,
        loginRequest,
      ),
    );

    if (getUserResponse.status >= 400)
      return {
        status: getUserResponse.status,
        message: 'login_user_error',
        data: null,
      };

    const createTokenResponse = await firstValueFrom(
      this.tokenServiceClient.send<TokenResponse, CreateTokenDto>(TOKEN_CREATE, {
        userId: getUserResponse.data.user.id,
      }),
    );

    return {
      status: createTokenResponse.status,
      message: createTokenResponse.status < 400 ? 'login_success' : 'login_failure',
      data: createTokenResponse.data,
    };
  }

  @Post('/logout')
  @ApiOperation({ description: 'User logout' })
  @ApiBody({ type: [UserIdDto] })
  @ApiOkResponse({
    type: TokenDestroyResponse,
  })
  async logoutUser(@Body() data: UserIdDto): Promise<TokenDestroyResponse> {
    const getUserResponse = await firstValueFrom(
      this.userServiceClient.send<UserResponses.UserGet, UserIdDto>(USER_GET, data),
    );

    if (getUserResponse.status >= 400)
      return {
        message: 'logout_user_error',
        status: getUserResponse.status,
        data: { destroyed: false },
      };

    const destroyTokenResponse = await firstValueFrom(
      this.tokenServiceClient.send<TokenDestroyResponse, DestroyTokenDto>(TOKEN_DESTROY, {
        userId: getUserResponse.data.user.id,
      }),
    );

    return {
      status: destroyTokenResponse.status,
      message: destroyTokenResponse.status < 400 ? 'logout_user_success' : 'logout_user_failure',
      data: destroyTokenResponse.data,
    };
  }

  @Post('/current')
  @Authorization(true)
  async current(@Req() req: any) {
    if (req.user)
      return {
        status: HttpStatus.OK,
        message: 'user_current',
        data: { user: req.user },
      };

    return {
      HttpStatus: HttpStatus.UNAUTHORIZED,
      message: 'user_not_current',
      data: undefined,
    };
  }
}
