import { Module } from '@nestjs/common';
import { RoleProvider } from 'src/providers/role.provider';
import { RoleController } from 'src/routes/role.controller';
import { RoleService } from 'src/services/clients/role/role.service';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [ConfigService, RoleProvider, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
