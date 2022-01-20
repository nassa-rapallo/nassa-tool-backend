import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmUserDto {
  @ApiProperty({ description: 'Token associated with this operation' })
  @IsString()
  link: string;
}
