import { Module } from '@nestjs/common';
import { GroupProvider } from 'src/providers/group.provider';
import { GroupController } from 'src/routes/group/group.controller';
import { GroupService } from 'src/services/clients/group/group.service';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [ConfigService, GroupProvider, GroupService],
  exports: [GroupProvider, GroupService],
})
export class GroupModule {}
