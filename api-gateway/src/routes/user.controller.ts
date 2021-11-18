import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import {
  USER_ADD_ROLE,
  USER_CREATE,
  USER_GET_ALL,
} from '../clients/user/commands';
import { createUserDto } from '../modules/user/model/dto/CreateUserDto';

@UseInterceptors(ResponseInterceptor)
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
    return firstValueFrom(this.userServiceClient.send(USER_CREATE, createUser));
  }

  @Post('/role')
  async addRoleToUser(@Body() data: { userId: string; roleId: string }) {
    return firstValueFrom(this.userServiceClient.send(USER_ADD_ROLE, data));
  }
}
