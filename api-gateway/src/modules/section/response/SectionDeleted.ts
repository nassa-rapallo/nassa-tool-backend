import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class SectionDeleted extends DefaultResponse {
  @ApiProperty({ description: 'The result of the delete operation' })
  data: {
    deleted: boolean;
  };
}
