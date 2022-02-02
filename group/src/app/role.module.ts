import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from 'src/controllers/role.controller';
import { Role } from 'src/entities/role.entity';
import { Group } from 'src/group.module';
import { ConfigService } from 'src/services/config/config.service';
import { TypeOrmConfigService } from 'src/services/config/typeorm-config.service';
import { RoleService } from 'src/services/role.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Role, Group]),
  ],
  controllers: [RoleController],
  providers: [ConfigService, RoleService],
  exports: [RoleService],
})
export class GroupModule {}
