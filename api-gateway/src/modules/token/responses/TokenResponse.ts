import { ApiProperty } from '@nestjs/swagger';
import { TOKEN } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class TokenResponse extends DefaultResponse {
  @ApiProperty({ example: TOKEN, description: 'The created JWT token' })
  data: { token: string };
}
