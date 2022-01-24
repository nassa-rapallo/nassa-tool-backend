import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SectionCreateDto {
  @ApiProperty({})
  @IsString()
  name: string;
}
