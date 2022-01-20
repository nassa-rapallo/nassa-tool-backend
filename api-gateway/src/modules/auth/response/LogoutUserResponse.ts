import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class LogoutUserResponse extends DefaultResponse {
  @ApiProperty({
    example: { logged_out: true },
    description: 'Describe if the action went through',
  })
  data: { logged_out: boolean };
}
