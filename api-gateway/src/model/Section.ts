import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsArray } from 'class-validator';
import { SECTION, UUID } from 'src/shared/constants/model';
import { Rule } from './Rule';

export class Section {
  @ApiProperty({ example: UUID, description: 'ID of the section' })
  @IsString()
  @IsUUID(4, { message: 'id must be an UUID' })
  id: string;

  @ApiProperty({ example: SECTION, description: 'Name of the section' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'List of the rules' })
  @IsArray({ message: 'rules must be an array' })
  rules: Rule[];
}
