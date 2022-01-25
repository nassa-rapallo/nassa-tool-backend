import { Module } from '@nestjs/common';
import { PermissionController } from './controllers/permission.controller';
import { PermissionService } from './services/permission.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleController } from './controllers/rule.controller';
import { Rule } from './entities/rule.entity';
import { RuleService } from './services/rule.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Rule]),
  ],

  controllers: [PermissionController, RuleController],
  providers: [PermissionService, RuleService],
})
export class PermissionModule {}
