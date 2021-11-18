import { ApiProperty } from '@nestjs/swagger';
import { ResponseType } from 'src/lib/ResponseType';

export class LoginResponseType extends ResponseType {
  @ApiProperty({ example: { data: { token: 'encodedToken' } }, nullable: true })
  data: {
    token: string;
  };
}
