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
import { MailResponse } from 'src/modules/mailer/model/response/MailResponse';
import { SendMailDto } from 'src/modules/mailer/model/dto/SendMailDto';
import { AddRoleDto } from 'src/modules/user/model/dto/AddRoleDto';
import {
  UserLinkResponse,
  UserResponse,
  ConfirmUserResponse,
  ForgotPasswordResponse,
  ChangePasswordResponse,
  UserSearchAllResponse,
} from 'src/modules/user/model/responses';
import { ConfirmUserDto } from 'src/modules/user/model/dto/ConfirmUserDto';
import { ForgotPasswordDto } from 'src/modules/user/model/dto/ForgotPasswordDto';
import { ChangePasswordDto } from 'src/modules/user/model/dto/ChangePasswordDto';

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
  async getUsers(): UserSearchAllResponse {
    return firstValueFrom(
      this.userServiceClient.send<UserSearchAllResponse>(USER_GET_ALL, {}),
    );
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): UserLinkResponse {
    const userCreateResponse = await firstValueFrom(
      this.userServiceClient.send<UserLinkResponse, CreateUserDto>(
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
  async addRoleToUser(@Body() data: AddRoleDto) {
    return firstValueFrom(
      this.userServiceClient.send<UserResponse, AddRoleDto>(
        USER_ADD_ROLE,
        data,
      ),
    );
  }

  @Post('/confirm')
  async confirmUser(@Body() data: ConfirmUserDto): ConfirmUserResponse {
    return firstValueFrom(
      this.userServiceClient.send<ConfirmUserResponse, ConfirmUserDto>(
        USER_CONFIRM_LINK,
        data,
      ),
    );
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() data: ForgotPasswordDto,
  ): ForgotPasswordResponse {
    const forgotPasswordResponse = await firstValueFrom(
      this.userServiceClient.send<ForgotPasswordResponse, ForgotPasswordDto>(
        USER_FORGOT_PASSWORD,
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
  async changePassword(
    @Body() data: ChangePasswordDto,
  ): ChangePasswordResponse {
    return firstValueFrom(
      this.userServiceClient.send<ChangePasswordResponse, ChangePasswordDto>(
        USER_CHANGE_PASSWORD,
        data,
      ),
    );
  }
}
