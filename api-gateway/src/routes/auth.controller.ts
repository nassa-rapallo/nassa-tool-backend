import { Response } from 'src/lib/Response';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { TOKEN_CREATE, TOKEN_DESTROY } from 'src/clients/token/commands';
import {
  USER_SEARCH_BY_CREDENTIALS,
  USER_SEARCH_BY_ID,
} from 'src/clients/user/commands';
import { isOk } from 'src/lib/responseCode';
import { LoginUserDto } from 'src/modules/auth/model/dto/LoginUserDto';
import { LoginUserResponse } from 'src/modules/auth/model/response/LoginUserResponse';
import { TokenCreateResponse } from 'src/modules/token/model/response/TokenCreateResponse';
import { UserSearchResponse } from 'src/modules/user/model/response/UserSearchResponse';
import { TokenDestroyResponse } from 'src/modules/token/model/response/TokenDeleteResponse';
import { LoginResponseType } from 'src/modules/auth/swagger/LoginResponseType';
import { LogoutResponseType } from 'src/modules/auth/swagger/LogoutResponseType';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Authorization } from 'src/services/decorators/authorization.decorator';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
  ) {}

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginResponseType,
  })
  async loginUser(
    @Body() loginRequest: LoginUserDto,
  ): Promise<LoginUserResponse> {
    console.log('LOGIN-1', loginRequest);
    const getUserResponse: UserSearchResponse = await firstValueFrom(
      this.userServiceClient.send(USER_SEARCH_BY_CREDENTIALS, loginRequest),
    );

    if (!isOk(getUserResponse.status))
      return {
        status: getUserResponse.status,
        message: 'login_user_error',
        data: null,
        errors: getUserResponse.errors,
      };

    const createTokenResponse: TokenCreateResponse = await firstValueFrom(
      this.tokenServiceClient.send(TOKEN_CREATE, {
        userId: getUserResponse.data.user.id,
      }),
    );

    return {
      status: createTokenResponse.status,
      message: isOk(createTokenResponse.status)
        ? 'login_success'
        : 'login_failure',
      data: createTokenResponse.data,
      errors: createTokenResponse.errors,
    };
  }

  @Post('/logout')
  @ApiCreatedResponse({
    type: LogoutResponseType,
  })
  async logoutUser(@Body() data: { id: string }): Promise<Response<boolean>> {
    const getUserResponse: UserSearchResponse = await firstValueFrom(
      this.userServiceClient.send(USER_SEARCH_BY_ID, data),
    );

    if (!isOk(getUserResponse.status))
      return {
        message: 'logout_user_error',
        status: getUserResponse.status,
        errors: getUserResponse.errors,
        data: false,
      };

    const destroyTokenResponse: TokenDestroyResponse = await firstValueFrom(
      this.tokenServiceClient.send(TOKEN_DESTROY, {
        id: getUserResponse.data.user.id,
      }),
    );

    return {
      status: destroyTokenResponse.status,
      message: isOk(destroyTokenResponse.status)
        ? 'logout_user_success'
        : 'logout_user_failure',
      errors: destroyTokenResponse.errors,
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
