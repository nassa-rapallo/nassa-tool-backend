import { MAILER_SERVICE, TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { Body, Controller, Get, Inject, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import * as COMMANDS from '../clients/user/commands';
import { MAILER_SEND } from 'src/clients/mailer/commands';
//prettier-ignore
import * as Responses from 'src/modules/user/response';
import * as Dto from 'src/modules/user/dto';
import { MailResponse } from 'src/modules/mailer/response/MailResponse';
import { SendMailDto } from 'src/modules/mailer/dto/SendMailDto';

@UseInterceptors(ResponseInterceptor)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(MAILER_SERVICE) private readonly mailerServiceClient: ClientProxy,
  ) {}

  @Get('/')
  @ApiOperation({ description: 'Get all current users' })
  @ApiOkResponse({ type: Responses.UserGetAll })
  async getUsers(): Promise<Responses.UserGetAll> {
    return firstValueFrom(
      this.userServiceClient.send<Responses.UserGetAll>(COMMANDS.USER_GET_ALL, {}),
    );
  }

  @Post('/')
  @ApiOperation({ description: 'Create a new user' })
  @ApiBody({ type: [Dto.CreateUserDto] })
  @ApiOkResponse({ type: Responses.UserLink })
  async createUser(@Body() createUser: Dto.CreateUserDto): Promise<Responses.UserLink> {
    const userCreateResponse = await firstValueFrom(
      this.userServiceClient.send<Responses.UserLink, Dto.CreateUserDto>(
        COMMANDS.USER_CREATE,
        createUser,
      ),
    );

    if (userCreateResponse.data && userCreateResponse.data.link) {
      await firstValueFrom(
        this.mailerServiceClient.send<MailResponse, SendMailDto>(MAILER_SEND, {
          to: userCreateResponse.data.user.email,
          subject: 'Conferma Email',
          template: 'confirmation',
          context: { link: userCreateResponse.data.link },
        }),
      );
    }

    return userCreateResponse;
  }

  @Post('/role')
  @ApiOperation({ description: 'Add a role to an existing user' })
  @ApiBody({ type: [Dto.AddRoleDto] })
  @ApiOkResponse({ type: Responses.User })
  async addRoleToUser(@Body() data: Dto.AddRoleDto): Promise<Responses.User> {
    return firstValueFrom(
      this.userServiceClient.send<Responses.User, Dto.AddRoleDto>(COMMANDS.USER_ADD_ROLE, data),
    );
  }

  @Post('/confirm')
  @ApiOperation({ description: 'Confirm user email' })
  @ApiBody({ type: [Dto.ConfirmUserDto] })
  @ApiOkResponse({ type: Responses.UserConfirm })
  async confirmUser(@Body() data: Dto.ConfirmUserDto): Promise<Responses.UserConfirm> {
    return firstValueFrom(
      this.userServiceClient.send<Responses.UserConfirm, Dto.ConfirmUserDto>(
        COMMANDS.USER_CONFIRM_LINK,
        data,
      ),
    );
  }

  @Post('/forgot-password')
  @ApiOperation({ description: 'Request the ability to set a new password' })
  @ApiBody({ type: [Dto.ForgotPasswordDto] })
  @ApiOkResponse({ type: Responses.UserForgotPassword })
  async forgotPassword(@Body() data: Dto.ForgotPasswordDto): Promise<Responses.UserForgotPassword> {
    const forgotPasswordResponse = await firstValueFrom(
      this.userServiceClient.send<Responses.UserForgotPassword, Dto.ForgotPasswordDto>(
        COMMANDS.USER_FORGOT_PASSWORD,
        data,
      ),
    );

    if (forgotPasswordResponse.data && forgotPasswordResponse.data.link) {
      await firstValueFrom(
        this.mailerServiceClient.send<void, SendMailDto>(MAILER_SEND, {
          to: forgotPasswordResponse.data.email,
          subject: 'Cambio Password',
          template: 'forgotPassword',
          context: { link: forgotPasswordResponse.data.link },
        }),
      );
    }

    return forgotPasswordResponse;
  }

  @Put('/change-password')
  @ApiOperation({ description: 'Set a new password' })
  @ApiBody({ type: [Dto.ChangePasswordDto] })
  @ApiOkResponse({ type: Responses.UserChangePassword })
  async changePassword(@Body() data: Dto.ChangePasswordDto): Promise<Responses.UserChangePassword> {
    return firstValueFrom(
      this.userServiceClient.send<Responses.UserChangePassword, Dto.ChangePasswordDto>(
        COMMANDS.USER_CHANGE_PASSWORD,
        data,
      ),
    );
  }
}
