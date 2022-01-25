import { Module } from '@nestjs/common';
import { SectionProvider } from 'src/providers/section.provider';
import { SectionController } from 'src/routes/section.controller';
import { SectionService } from 'src/services/clients/section/section.service';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  controllers: [SectionController],
  providers: [ConfigService, SectionProvider, SectionService],
  exports: [SectionService],
})
export class SectionModule {}
