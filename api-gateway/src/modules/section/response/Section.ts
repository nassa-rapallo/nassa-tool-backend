import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';
import { Section as SectionModel } from 'src/model/Section';

export class Section extends DefaultResponse {
  @ApiProperty({ description: 'The response section' })
  data: {
    section: SectionModel;
  };
}
