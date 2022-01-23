import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Inject, Post, Body, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { PermissionService } from 'src/services/clients/permission/permission.service';

import * as Dto from 'src/modules/permission/dto';
import * as Responses from 'src/modules/permission/response';

@UseInterceptors(ResponseInterceptor)
@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(
    @Inject()
    private readonly permissionService: PermissionService,
  ) {}

  @Post('/')
  @ApiOperation({ description: 'Create a new permission cluster' })
  @ApiBody({ type: Dto.CreatePermissionDto })
  @ApiResponse({ type: Responses.PermissionCreated })
  async createPermission(
    @Body() data: Dto.CreatePermissionDto,
  ): Promise<Responses.PermissionCreated> {
    return this.permissionService.permissionCreate(data);
  }

  @Post('/')
  @ApiOperation({ description: 'Check if the permission cluster is OK' })
  @ApiBody({ type: Dto.PermissionIsPermittedDto })
  @ApiResponse({ type: Responses.PermissionIsPermitted })
  async isPermittedPermission(
    @Body() data: Dto.PermissionIsPermittedDto,
  ): Promise<Responses.PermissionIsPermitted> {
    return this.permissionService.permissionIsPermitted(data);
  }
}
