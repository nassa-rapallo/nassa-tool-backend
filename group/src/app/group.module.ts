import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from 'src/controllers/group.controller';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';
import { ConfigService } from 'src/services/config/config.service';
import { TypeOrmConfigService } from 'src/services/config/typeorm-config.service';
import { GroupService } from 'src/services/group.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Group, Role]),
  ],
  controllers: [GroupController],
  providers: [ConfigService, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
