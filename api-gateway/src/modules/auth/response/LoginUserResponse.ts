import { ApiProperty } from '@nestjs/swagger';
import { TOKEN } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class LoginUserResponse extends DefaultResponse {
  @ApiProperty({
    example: { token: TOKEN },
    description: 'The generated JWT token',
  })
  data: { token: string };
}
