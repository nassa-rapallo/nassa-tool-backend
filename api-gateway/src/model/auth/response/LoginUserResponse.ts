import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponse {
  @ApiProperty({ example: 'token_create_success' })
  message: string;

  @ApiProperty({ example: { token: 'encodedToken' }, nullable: true })
  data: {
    token: string;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
