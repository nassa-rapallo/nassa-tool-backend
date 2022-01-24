import { ApiProperty } from '@nestjs/swagger';
import { Section } from 'src/model/Section';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class SectionGetAll extends DefaultResponse {
  @ApiProperty({ description: 'The list of all the sections' })
  data: {
    sections: Section[];
  };
}
