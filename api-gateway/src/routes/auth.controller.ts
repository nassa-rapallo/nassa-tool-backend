import { Body, Controller, HttpStatus, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Authorization } from 'src/services/decorators/authorization.decorator';
import { UserService } from 'src/services/clients/user/user.service';
import { TokenService } from 'src/services/clients/token/token.service';

import * as UserDto from 'src/modules/user/dto';
import * as TokenResponses from 'src/modules/token/response';
import * as Responses from 'src/modules/auth/response';
import * as Dto from 'src/modules/auth/dto';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/login')
  @ApiOperation({ description: 'User login operation' })
  @ApiBody({ type: Dto.LoginUserDto })
  @ApiOkResponse({
    type: Responses.LoginUser,
    description: 'Login successful',
  })
  async loginUser(@Body() loginRequest: Dto.LoginUserDto): Promise<Responses.LoginUser> {
    const getUserResponse = await this.userService.userGetByCredentials(loginRequest);

    if (getUserResponse.status >= 400)
      return {
        status: getUserResponse.status,
        message: 'login_user_error',
        data: null,
      };

    const createTokenResponse = await this.tokenService.tokenCreate({
      userId: getUserResponse.data.user.id,
    });

    return {
      status: createTokenResponse.status,
      message: createTokenResponse.status < 400 ? 'login_success' : 'login_failure',
      data: createTokenResponse.data,
    };
  }

  @Post('/logout')
  @ApiOperation({ description: 'User logout' })
  @ApiBody({ type: UserDto.UserIdDto })
  @ApiOkResponse({
    type: TokenResponses.TokenDestroy,
  })
  async logoutUser(@Body() data: UserDto.UserIdDto): Promise<TokenResponses.TokenDestroy> {
    const getUserResponse = await this.userService.userGet(data);

    if (getUserResponse.status >= 400)
      return {
        message: 'logout_user_error',
        status: getUserResponse.status,
        data: { destroyed: false },
      };

    const destroyTokenResponse = await this.tokenService.tokenDestroy({
      userId: getUserResponse.data.user.id,
    });

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
