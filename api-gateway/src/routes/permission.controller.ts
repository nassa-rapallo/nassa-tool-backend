import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, Post, Body, UseInterceptors } from '@nestjs/common';
import { PERMISSION_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
import { PERMISSION_CREATE } from 'src/clients/permission/commands';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { CreatePermissionDto } from 'src/modules/permission/dto';
import { CreatePermissionResponse } from 'src/modules/permission/response';

@UseInterceptors(ResponseInterceptor)
@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionServiceClient: ClientProxy,
  ) {}

  @Post('/')
  @ApiOperation({ description: 'Create a new permission cluster' })
  @ApiBody({ type: [CreatePermissionDto] })
  @ApiResponse({ type: CreatePermissionResponse })
  async createPermission(@Body() data: CreatePermissionDto): Promise<CreatePermissionResponse> {
    return firstValueFrom(
      this.permissionServiceClient.send<CreatePermissionResponse, CreatePermissionDto>(
        PERMISSION_CREATE,
        data,
      ),
    );
  }
}
