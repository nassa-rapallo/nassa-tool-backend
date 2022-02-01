import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class Confirm extends DefaultResponse {
  @ApiProperty({
    example: { confirmed: true },
    description: 'Wether the user is confirmed or not',
  })
  data: { confirmed: boolean };
}
