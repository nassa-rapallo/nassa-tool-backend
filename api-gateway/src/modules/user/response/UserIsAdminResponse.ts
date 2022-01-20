import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserIsAdminResponse extends DefaultResponse {
  @ApiProperty({
    example: { admin: true },
    description: 'If the user is admin of the given section',
  })
  data: {
    admin: boolean;
  };
}
