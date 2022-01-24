import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleService } from 'src/services/clients/role/role.service';

import * as Dto from 'src/modules/role/dto';
import * as Params from 'src/modules/role/param';
import * as Responses from 'src/modules/role/response';

@UseInterceptors(ResponseInterceptor)
@Controller('roles')
export class RoleController {
  constructor(@Inject() private readonly roleService: RoleService) {}

  @Get('/')
  @ApiOperation({ description: 'Get all current roles' })
  @ApiResponse({ type: Responses.RoleGetAll })
  async getAllRoles(): Promise<Responses.RoleGetAll> {
    return this.roleService.roleGetAll();
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get role by ID' })
  @ApiBody({ type: Params.GetRole })
  @ApiResponse({ type: Responses.Role })
  async getRole(@Param() param: Params.GetRole): Promise<Responses.Role> {
    return this.roleService.roleGet(param);
  }

  @Post('/')
  @ApiOperation({ description: 'Create new role' })
  @ApiBody({ type: Dto.CreateRoleDto })
  @ApiResponse({ type: Responses.Role })
  async createRole(@Body() createRoleDto: Dto.CreateRoleDto): Promise<Responses.Role> {
    return this.roleService.roleCreate(createRoleDto);
  }

  @Delete('/')
  @ApiOperation({ description: 'Delete a role by ID' })
  @ApiBody({ type: Dto.DeleteRoleDto })
  @ApiResponse({ type: Responses.RoleDeleted })
  async deleteRole(@Body() deleteRoleDto: Dto.DeleteRoleDto): Promise<Responses.RoleDeleted> {
    return this.roleService.roleDelete(deleteRoleDto);
  }

  @Put('/')
  @ApiOperation({ description: 'Update a role by ID' })
  @ApiBody({ type: Dto.UpdateRoleDto })
  @ApiResponse({ type: Responses.RoleUpdated })
  async updateRole(@Body() updateRoleDto: Dto.UpdateRoleDto): Promise<Responses.RoleUpdated> {
    return this.roleService.roleUpdate(updateRoleDto);
  }
}
