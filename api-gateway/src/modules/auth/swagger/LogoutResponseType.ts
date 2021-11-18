import { ApiProperty } from '@nestjs/swagger';
import { ResponseType } from 'src/lib/ResponseType';

export class LogoutResponseType extends ResponseType {
  @ApiProperty({ example: { data: true } })
  data: boolean;
}
