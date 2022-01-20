import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';

export class AddRoleDto {
  @ApiProperty({ example: UUID, description: 'ID of the user' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  userId: string;

  @ApiProperty({ example: UUID, description: 'ID of the role' })
  @IsString()
  @IsUUID(4, { message: 'ID must be a UUID' })
  roleId: string;
}
