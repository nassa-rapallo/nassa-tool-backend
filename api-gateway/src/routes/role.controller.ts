import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { USER_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
import { ROLE_CREATE, ROLE_GET_ALL } from 'src/clients/role/commands';
import { CreateUserDto } from 'src/modules/role/dto/CreateUserDto';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(USER_SERVICE) private readonly roleServiceClient: ClientProxy,
  ) {}

  @Get('/')
  async getAllRoles() {
    return firstValueFrom(this.roleServiceClient.send(ROLE_GET_ALL, {}));
  }

  @Post('/')
  async createRole(@Body() createRoleDto: CreateUserDto) {
    return firstValueFrom(
      this.roleServiceClient.send(ROLE_CREATE, createRoleDto),
    );
  }
}
