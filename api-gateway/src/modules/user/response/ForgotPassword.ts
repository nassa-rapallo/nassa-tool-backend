import { ApiProperty } from '@nestjs/swagger';
import { EMAIL, TOKEN } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class ForgotPassword extends DefaultResponse {
  @ApiProperty({
    example: { link: TOKEN, email: EMAIL },
    description: 'Email and Link data',
  })
  data: {
    link: string;
    email: string;
  };
}
