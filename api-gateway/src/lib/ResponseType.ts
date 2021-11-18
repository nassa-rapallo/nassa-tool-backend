import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseType {
  @ApiProperty({ example: HttpStatus.OK })
  status: number;

  @ApiProperty({ example: 'token_create_success' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  errors: string[];
}
