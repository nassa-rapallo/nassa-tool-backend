import { Module } from '@nestjs/common';
import { GroupModule } from './app/group.module';

@Module({
  imports: [GroupModule],
})
export class Group {}
