import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleService } from 'src/services/clients/role/role.service';

import * as Dto from 'src/modules/role/dto';
import * as Params from 'src/modules/role/param';
import * as Responses from 'src/modules/role/response';

@UseInterceptors(ResponseInterceptor)
@Controller('group/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/')
  @ApiOperation({ description: 'Get all current roles' })
  @ApiResponse({ type: Responses.GetAll })
  async getAllRoles(): Promise<Responses.GetAll> {
    return this.roleService.roleGetAll();
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get role by ID' })
  @ApiBody({ type: Params.GetRole })
  @ApiResponse({ type: Responses.Get })
  async getRole(@Param() param: Params.GetRole): Promise<Responses.Get> {
    return this.roleService.roleGet(param);
  }

  @Post('/')
  @ApiOperation({ description: 'Create new role' })
  @ApiBody({ type: Dto.RoleCreate })
  @ApiResponse({ type: Responses.Created })
  async createRole(@Body() createRoleDto: Dto.RoleCreate): Promise<Responses.Created> {
    return this.roleService.roleCreate(createRoleDto);
  }

  @Delete('/')
  @ApiOperation({ description: 'Delete a role by ID' })
  @ApiBody({ type: Dto.RoleDelete })
  @ApiResponse({ type: Responses.Deleted })
  async deleteRole(@Body() deleteRoleDto: Dto.RoleDelete): Promise<Responses.Deleted> {
    return this.roleService.roleDelete(deleteRoleDto);
  }

  @Put('/')
  @ApiOperation({ description: 'Update a role by ID' })
  @ApiBody({ type: Dto.RoleUpdate })
  @ApiResponse({ type: Responses.Updated })
  async updateRole(@Body() updateRoleDto: Dto.RoleUpdate): Promise<Responses.Updated> {
    return this.roleService.roleUpdate(updateRoleDto);
  }
}
