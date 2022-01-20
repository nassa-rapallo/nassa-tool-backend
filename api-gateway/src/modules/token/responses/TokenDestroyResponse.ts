import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class TokenDestroyResponse extends DefaultResponse {
  @ApiProperty({
    example: { destroyed: true },
    description: 'Wether the token has been destroyed',
  })
  data: {
    destroyed: boolean;
  };
}
