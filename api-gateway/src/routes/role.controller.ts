import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
import { USER_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
import { ROLE_CREATE, ROLE_GET_ALL } from 'src/clients/role/commands';
import {
  RoleResponse as RoleCreateResponse,
  RoleSearchAllResponse,
} from 'src/modules/role/response';
import { CreateRoleDto } from 'src/modules/role/dto/CreateRoleDto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(@Inject(USER_SERVICE) private readonly roleServiceClient: ClientProxy) {}

  @Get('/')
  @ApiOperation({ description: 'Get all current roles' })
  @ApiResponse({ type: RoleSearchAllResponse })
  async getAllRoles(): Promise<RoleSearchAllResponse> {
    return firstValueFrom(this.roleServiceClient.send<RoleSearchAllResponse>(ROLE_GET_ALL, {}));
  }

  @Post('/')
  @ApiOperation({ description: 'Create new role' })
  @ApiBody({ type: [CreateRoleDto] })
  @ApiResponse({ type: RoleCreateResponse })
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleCreateResponse> {
    return firstValueFrom(
      this.roleServiceClient.send<RoleCreateResponse, CreateRoleDto>(ROLE_CREATE, createRoleDto),
    );
  }
}
