import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';
import { Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { SectionService } from 'src/services/clients/section/section.service';

import * as Dto from 'src/modules/section/dto';
import * as Responses from 'src/modules/section/response';

@UseInterceptors(ResponseInterceptor)
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('/')
  async sectionGetAll(): Promise<Responses.SectionGetAll> {
    return this.sectionService.sectionGetAll();
  }

  @Post('/')
  async sectionCreate(data: Dto.SectionCreateDto): Promise<Responses.Section> {
    return this.sectionService.sectionCreate(data);
  }

  @Put('/')
  async sectionUpdate(data: Dto.SectionUpdateDto): Promise<Responses.SectionUpdated> {
    return this.sectionService.sectionUpdate(data);
  }

  @Delete('/')
  async sectionDelete(data: Dto.SectionGetDto): Promise<Responses.SectionDeleted> {
    return this.sectionService.sectionDelete(data);
  }
}
