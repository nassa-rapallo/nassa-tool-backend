import { MAILER_SERVICE, TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { UserCreateResponse } from 'src/modules/user/model/response/UserCreateResponse';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import {
  USER_ADD_ROLE,
  USER_CONFIRM_LINK,
  USER_CREATE,
  USER_GET_ALL,
  USER_FORGOT_PASSWORD,
  USER_CHANGE_PASSWORD,
} from '../clients/user/commands';
import { CreateUserDto } from '../modules/user/model/dto/CreateUserDto';
import { MAILER_SEND } from 'src/clients/mailer/commands';
import { Response } from 'src/lib/Response';
import { MailResponse } from 'src/modules/mailer/model/response/MailResponse';
import { SendMailDto } from 'src/modules/mailer/model/dto/SendMailDto';

@UseInterceptors(ResponseInterceptor)
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(MAILER_SERVICE) private readonly mailerServiceClient: ClientProxy,
  ) {}

  @ApiOkResponse({
    description: 'Get All Users',
  })
  @Get()
  async getUsers() {
    return firstValueFrom(this.userServiceClient.send(USER_GET_ALL, {}));
  }

  @Post()
  async createUser(
    @Body() createUser: CreateUserDto,
  ): Promise<UserCreateResponse> {
    const userCreateResponse = await firstValueFrom(
      this.userServiceClient.send<UserCreateResponse, CreateUserDto>(
        USER_CREATE,
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
  async addRoleToUser(@Body() data: { userId: string; roleId: string }) {
    return firstValueFrom(this.userServiceClient.send(USER_ADD_ROLE, data));
  }

  @Post('/confirm')
  async confirmUser(@Body() data: { link: string }) {
    return firstValueFrom(this.userServiceClient.send(USER_CONFIRM_LINK, data));
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() data: { userId: string }) {
    const forgotPasswordResponse: Response<{ email: string; link: string }> =
      await firstValueFrom(
        this.userServiceClient.send(USER_FORGOT_PASSWORD, data),
      );

    if (forgotPasswordResponse.data && forgotPasswordResponse.data.link) {
      await firstValueFrom(
        this.mailerServiceClient.send(MAILER_SEND, {
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
  async changePassword(
    @Body() data: { userId: string; link: string; newPassword: string },
  ) {
    return firstValueFrom(
      this.userServiceClient.send(USER_CHANGE_PASSWORD, data),
    );
  }
}
