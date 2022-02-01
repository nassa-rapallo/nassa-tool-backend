import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, UseInterceptors, Get, Param, Put, Delete } from '@nestjs/common';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { PermissionService } from 'src/services/clients/permission/permission.service';

import * as Dto from 'src/modules/permission/dto';
import * as Responses from 'src/modules/permission/response';

@UseInterceptors(ResponseInterceptor)
@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('/')
  async getAllPermission(): Promise<Responses.GetAll> {
    return this.permissionService.permissionGetAll();
  }

  @Get(':id')
  async getPermission(@Param() params: Dto.Get): Promise<Responses.Get> {
    return this.permissionService.permissionGet(params);
  }

  @Post('/')
  @ApiOperation({ description: 'Create a new permission cluster' })
  @ApiBody({ type: Dto.Create })
  @ApiResponse({ type: Responses.Created })
  async createPermission(@Body() data: Dto.Create): Promise<Responses.Created> {
    return this.permissionService.permissionCreate(data);
  }

  @Put('/')
  async updatePermission(@Body() data: Dto.Update): Promise<Responses.Updated> {
    return this.permissionService.permissionUpdate(data);
  }

  @Delete('/')
  async deletePermisison(@Body() data: Dto.Delete): Promise<Responses.Deleted> {
    return this.permissionService.permissionDelete(data);
  }

  @Post('/')
  @ApiOperation({ description: 'Check if the permission cluster is OK' })
  @ApiBody({ type: Dto.Permitted })
  @ApiResponse({ type: Responses.Permitted })
  async isPermittedPermission(@Body() data: Dto.Permitted): Promise<Responses.Permitted> {
    return this.permissionService.permissionIsPermitted(data);
  }
}
