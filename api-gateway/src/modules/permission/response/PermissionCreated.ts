import { ApiProperty } from '@nestjs/swagger';
import { Rule } from 'src/model/Rule';
import { Section } from 'src/model/Section';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class PermissionCreated extends DefaultResponse {
  @ApiProperty({ description: 'Response of a newly created permission' })
  data: {
    action: Rule;
    section: Section;
  };
}
