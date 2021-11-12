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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  USER_ADD_ROLE,
  USER_CREATE,
  USER_GET_ALL,
} from '../clients/user/commands';
import { createUserDto } from '../model/user/dto/CreateUserDto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
  ) {}

  @ApiOkResponse({
    description: 'Get All Users',
  })
  @Get()
  async getUsers() {
    return firstValueFrom(this.userServiceClient.send(USER_GET_ALL, {}));
  }

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    const response = await firstValueFrom(
      this.userServiceClient.send(USER_CREATE, createUser),
    );

    if (response.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: response.message,
          data: null,
        },
        response.status,
      );
    }
  }

  @Post('/role')
  async addRoleToUser(@Body() data: { userId: string; roleId: string }) {
    const response = await firstValueFrom(
      this.userServiceClient.send(USER_ADD_ROLE, data),
    );

    console.log('response', response);

    return response;
  }
}
