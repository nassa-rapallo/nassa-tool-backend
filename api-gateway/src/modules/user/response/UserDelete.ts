import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserDelete extends DefaultResponse {
  @ApiProperty()
  data: {
    deleted: boolean;
  };
}
