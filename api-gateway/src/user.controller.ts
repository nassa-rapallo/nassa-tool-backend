import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { createUserDto } from './model/user/createUserDto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @ApiOkResponse({
    description: 'Get All Users',
  })
  @Get()
  async getUsers() {
    return firstValueFrom(
      this.userServiceClient.send('user_get_all_users', {}),
    );
  }

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return firstValueFrom(
      this.userServiceClient.send('user_create_user', createUser),
    );
  }
}
