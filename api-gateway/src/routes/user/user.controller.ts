import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';

// client services
import { UserService } from 'src/services/clients/user/user.service';
import { MailerService } from 'src/services/clients/mailer/mailer.service';

// User Model
import * as Responses from 'src/modules/user/response';
import * as Dto from 'src/modules/user/dto';
import * as Params from 'src/modules/user/param';

@UseInterceptors(ResponseInterceptor)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                               CRUD OPERATION                               */
  /* -------------------------------------------------------------------------- */

  @Get('/')
  @ApiOperation({ description: 'Get all current users' })
  @ApiOkResponse({ type: Responses.GetAll })
  async getUsers(): Promise<Responses.GetAll> {
    return this.userService.userGetAll();
  }

  @Get(':id')
  async getUser(@Param() params: Params.UserGet): Promise<Responses.Get> {
    return this.userService.userGet(params);
  }

  @Post('/')
  @ApiOperation({ description: 'Create a new user' })
  @ApiBody({ type: Dto.Create })
  @ApiOkResponse({ type: Responses.UserLink })
  async createUser(@Body() createUser: Dto.Create): Promise<Responses.UserLink> {
    const userCreateResponse = await this.userService.userCreate(createUser);

    if (userCreateResponse.data && userCreateResponse.data.link) {
      await this.mailerService.mailerSend({
        to: userCreateResponse.data.user.email,
        subject: 'Conferma Email',
        template: 'confirmation',
        context: { link: userCreateResponse.data.link },
      });
    }

    return userCreateResponse;
  }

  @Delete('/')
  async deleteUser(@Body() deleteUser: Dto.Delete): Promise<Responses.Deleted> {
    return this.userService.userDelete(deleteUser);
  }

  @Put('/')
  async updateUser(@Body() updateUser: Dto.Update): Promise<Responses.Updated> {
    return this.userService.userUpdate(updateUser);
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  @Post('/role')
  @ApiOperation({ description: 'Add a role to an existing user' })
  @ApiBody({ type: Dto.AddRole })
  @ApiOkResponse({ type: Responses.Get })
  async addRoleToUser(@Body() data: Dto.AddRole): Promise<Responses.Get> {
    return this.userService.userAddRole(data);
  }

  @Post('/confirm')
  @ApiOperation({ description: 'Confirm user email' })
  @ApiBody({ type: Dto.Confirm })
  @ApiOkResponse({ type: Responses.Confirm })
  async confirmUser(@Body() data: Dto.Confirm): Promise<Responses.Confirm> {
    return this.userService.userConfirm(data);
  }

  @Post('/forgot-password')
  @ApiOperation({ description: 'Request the ability to set a new password' })
  @ApiBody({ type: Dto.ForgotPassword })
  @ApiOkResponse({ type: Responses.ForgotPassword })
  async forgotPassword(@Body() data: Dto.ForgotPassword): Promise<Responses.ForgotPassword> {
    const forgotPasswordResponse = await this.userService.userForgotPassword(data);

    if (forgotPasswordResponse.data && forgotPasswordResponse.data.link) {
      await this.mailerService.mailerSend({
        to: forgotPasswordResponse.data.email,
        subject: 'Cambio Password',
        template: 'forgotPassword',
        context: { link: forgotPasswordResponse.data.link },
      });
    }

    return forgotPasswordResponse;
  }

  @Put('/change-password')
  @ApiOperation({ description: 'Set a new password' })
  @ApiBody({ type: Dto.ChangePassword })
  @ApiOkResponse({ type: Responses.ChangePassword })
  async changePassword(@Body() data: Dto.ChangePassword): Promise<Responses.ChangePassword> {
    return this.userService.userChangePassword(data);
  }
}
