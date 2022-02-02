import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from 'src/controllers/permission.controller';
import { Permission } from 'src/entities/permission.entity';
import { ConfigService } from 'src/services/config/config.service';
import { TypeOrmConfigService } from 'src/services/config/typeorm-config.service';
import { PermissionService } from 'src/services/permission.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionController],
  providers: [ConfigService, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
