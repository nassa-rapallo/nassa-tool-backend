import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { USER_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
import { ROLE_CREATE, ROLE_GET_ALL } from 'src/clients/role/commands';
import { CreateRoleDto } from 'src/modules/role/model/dto/CreateRoleDto';
import {
  RoleResponse,
  RoleSearchAllResponse,
} from 'src/modules/role/model/responses';

@Controller('roles')
export class RoleController {
  constructor(
    @Inject(USER_SERVICE) private readonly roleServiceClient: ClientProxy,
  ) {}

  @Get('/')
  async getAllRoles(): RoleSearchAllResponse {
    return firstValueFrom(
      this.roleServiceClient.send<RoleSearchAllResponse>(ROLE_GET_ALL, {}),
    );
  }

  @Post('/')
  async createRole(@Body() createRoleDto: CreateRoleDto): RoleResponse {
    return firstValueFrom(
      this.roleServiceClient.send<RoleResponse, CreateRoleDto>(
        ROLE_CREATE,
        createRoleDto,
      ),
    );
  }
}
