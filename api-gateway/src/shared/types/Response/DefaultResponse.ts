import { ApiProperty } from '@nestjs/swagger';
import { MESSAGE, STATUS } from 'src/shared/constants/model';
import { Response } from './Response.type';

export class DefaultResponse implements Partial<Response> {
  @ApiProperty({ example: STATUS, description: 'Https status response' })
  status: number;

  @ApiProperty({ example: MESSAGE, description: 'Description of the result' })
  message: string;
}
