import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Section } from 'src/model/Section';

export class SectionUpdateDto {
  @ApiProperty({})
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({})
  sectionData: Partial<Section>;
}
