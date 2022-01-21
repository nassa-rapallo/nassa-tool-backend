import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class TokenData extends DefaultResponse {
  @ApiProperty({
    example: UUID,
    description: 'User ID associated with the given token',
  })
  data: {
    userId: string;
  };
}
