import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
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
    @Inject() private readonly userService: UserService,
    @Inject() private readonly mailerService: MailerService,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                               CRUD OPERATION                               */
  /* -------------------------------------------------------------------------- */

  @Get('/')
  @ApiOperation({ description: 'Get all current users' })
  @ApiOkResponse({ type: Responses.UserGetAll })
  async getUsers(): Promise<Responses.UserGetAll> {
    return this.userService.userGetAll();
  }

  @Get(':id')
  async getUser(@Param() params: Params.UserGet): Promise<Responses.UserGet> {
    return this.userService.userGet(params);
  }

  @Post('/')
  @ApiOperation({ description: 'Create a new user' })
  @ApiBody({ type: [Dto.CreateUserDto] })
  @ApiOkResponse({ type: Responses.UserLink })
  async createUser(@Body() createUser: Dto.CreateUserDto): Promise<Responses.UserLink> {
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
  async deleteUser(@Body() deleteUser: Dto.DeleteUserDto): Promise<Responses.UserDelete> {
    return this.userService.userDelete(deleteUser);
  }

  @Put('/')
  async updateUser(@Body() updateUser: Dto.UpdateUserDto): Promise<Responses.UserUpdate> {
    return this.userService.userUpdate(updateUser);
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  @Post('/role')
  @ApiOperation({ description: 'Add a role to an existing user' })
  @ApiBody({ type: [Dto.AddRoleDto] })
  @ApiOkResponse({ type: Responses.User })
  async addRoleToUser(@Body() data: Dto.AddRoleDto): Promise<Responses.User> {
    return this.userService.userAddRole(data);
  }

  @Post('/confirm')
  @ApiOperation({ description: 'Confirm user email' })
  @ApiBody({ type: [Dto.ConfirmUserDto] })
  @ApiOkResponse({ type: Responses.UserConfirm })
  async confirmUser(@Body() data: Dto.ConfirmUserDto): Promise<Responses.UserConfirm> {
    return this.userService.userConfirm(data);
  }

  @Post('/forgot-password')
  @ApiOperation({ description: 'Request the ability to set a new password' })
  @ApiBody({ type: [Dto.ForgotPasswordDto] })
  @ApiOkResponse({ type: Responses.UserForgotPassword })
  async forgotPassword(@Body() data: Dto.ForgotPasswordDto): Promise<Responses.UserForgotPassword> {
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
  @ApiBody({ type: [Dto.ChangePasswordDto] })
  @ApiOkResponse({ type: Responses.UserChangePassword })
  async changePassword(@Body() data: Dto.ChangePasswordDto): Promise<Responses.UserChangePassword> {
    return this.userService.userChangePassword(data);
  }
}
