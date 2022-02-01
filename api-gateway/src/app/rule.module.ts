import { Module } from '@nestjs/common';
import { RuleProvider } from 'src/providers/rule.provider';
import { RuleController } from 'src/routes/permission/rule.controller';
import { RuleService } from 'src/services/clients/rule/rule.service';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  controllers: [RuleController],
  providers: [ConfigService, RuleProvider, RuleService],
  exports: [RuleProvider, RuleService],
})
export class RuleModule {}
