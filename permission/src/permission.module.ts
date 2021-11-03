import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { PermissionController } from './permission/permission.controller';
import { RoleController } from './role/role.controller';
import { PermissionService } from './permission/permission.service';
import { Role } from './entities/role.entity';
import { Action } from './entities/action.entity';
import { Section } from './entities/section.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Permission, Section, Action, Role]),
  ],
  controllers: [PermissionController, RoleController],
  providers: [ConfigService, PermissionService],
})
export class PermissionModule {}
