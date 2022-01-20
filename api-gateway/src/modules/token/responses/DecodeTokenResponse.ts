import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class DecodeTokenResponse extends DefaultResponse {
  @ApiProperty({
    example: UUID,
    description: 'UserID associated with the given token',
  })
  data: { userId: string };
}

// export type DecodeTokenResponse = Promise<Response<{ userId: string }>>;
