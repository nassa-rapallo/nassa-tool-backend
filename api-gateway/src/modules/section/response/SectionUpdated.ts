import { ApiProperty } from '@nestjs/swagger';
import { Section } from 'src/model/Section';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class SectionUpdated extends DefaultResponse {
  @ApiProperty({
    description:
      'The result of the update action, and the updated section if the action was successful',
  })
  data: {
    updated: boolean;
    section?: Section;
  };
}
