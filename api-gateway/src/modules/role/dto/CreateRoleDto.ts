import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ROLE, SECTION } from 'src/shared/constants/model';

export class CreateRoleDto {
  @ApiProperty({ example: SECTION, description: 'Role section' })
  @IsString()
  section: string;

  @ApiProperty({ example: ROLE, description: 'Role name' })
  @IsString()
  name: string;
}
