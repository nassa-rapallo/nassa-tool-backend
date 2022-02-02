import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleController } from 'src/controllers/rule.controller';
import { Rule } from 'src/entities/rule.entity';
import { TypeOrmConfigService } from 'src/services/config/typeorm-config.service';
import { RuleService } from 'src/services/rule.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Rule]),
  ],
  controllers: [RuleController],
  providers: [ConfigService, RuleService],
  exports: [RuleService],
})
export class RuleModule {}
