import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ROLE, SECTION, UUID } from 'src/shared/constants/model';

export class Role {
  @ApiProperty({ example: UUID, description: 'Role ID' })
  @IsString()
  @IsUUID(4, { message: 'id must be an UUID' })
  id: string;

  @ApiProperty({ example: SECTION, description: 'The name of the section' })
  @IsString()
  section: string;

  @ApiProperty({ example: ROLE, description: 'The name of the role' })
  @IsString()
  name: string;
}
