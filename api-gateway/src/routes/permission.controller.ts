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
    @Body() data: { section: string; action: string; role: string },
  ) {
    await firstValueFrom(
      this.permissionServiceClient.send(PERMISSION_CREATE, data),
    );
  }
}
