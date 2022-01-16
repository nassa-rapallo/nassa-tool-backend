import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import {
  Controller,
  Inject,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { PERMISSION_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
import { PERMISSION_CREATE } from 'src/clients/permission/commands';
import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { CreatePermissionDto } from 'src/modules/permission/model/dto';
import { CreatePermissionResponse } from 'src/modules/permission/model/responses';

@UseInterceptors(ResponseInterceptor)
@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(
    @Inject(PERMISSION_SERVICE)
    private readonly permissionServiceClient: ClientProxy,
  ) {}

  @Post('/')
  async createPermission(
    @Body() data: CreatePermissionDto,
  ): CreatePermissionResponse {
    return firstValueFrom(
      this.permissionServiceClient.send<
        CreatePermissionResponse,
        CreatePermissionDto
      >(PERMISSION_CREATE, data),
    );
  }
}
