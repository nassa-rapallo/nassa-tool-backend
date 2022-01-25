import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ROLE, SECTION, UUID } from 'src/shared/constants/model';
import { Section } from './Section';

export class Role {
  @ApiProperty({ example: UUID, description: 'Role ID' })
  @IsString()
  @IsUUID(4, { message: 'id must be an UUID' })
  id: string;

  @ApiProperty({ example: SECTION, description: 'The role section' })
  @IsString()
  section: Section;

  @ApiProperty({ example: ROLE, description: 'The name of the role' })
  @IsString()
  name: string;
}
