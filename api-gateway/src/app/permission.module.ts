import { Module } from '@nestjs/common';
import { PermissionProvider } from 'src/providers/permission.provider';
import { PermissionController } from 'src/routes/permission.controller';
import { PermissionService } from 'src/services/clients/permission/permission.service';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [ConfigService, PermissionService, PermissionProvider],
  exports: [PermissionProvider, PermissionService],
})
export class PermissionModule {}
