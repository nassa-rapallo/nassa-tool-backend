import { Module } from '@nestjs/common';

import { PermissionModule } from 'src/app/permission.module';
import { RuleModule } from './app/rule.module';
@Module({
  imports: [PermissionModule, RuleModule],
})
export class Permission {}
