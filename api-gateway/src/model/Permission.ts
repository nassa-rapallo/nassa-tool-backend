import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';

export class Permission {
  @ApiProperty({
    example: UUID,
    description: 'Role related to the new permission',
  })
  @IsString()
  @IsUUID(4, { message: 'role must be an UUID' })
  role: string;

  @ApiProperty({
    example: UUID,
    description: 'For which action the role has now permission',
  })
  @IsString()
  @IsUUID(4, { message: 'action must be an UUID' })
  action: string;

  @ApiProperty({ example: UUID, description: 'In which section is the role' })
  @IsString()
  @IsUUID(4, { message: 'section must be an UUID' })
  section: string;
}
