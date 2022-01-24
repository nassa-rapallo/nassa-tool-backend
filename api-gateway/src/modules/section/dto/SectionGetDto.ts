import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SectionGetDto {
  @ApiProperty({})
  @IsUUID(4, { message: 'ID must be a valid UUID' })
  id: string;
}
