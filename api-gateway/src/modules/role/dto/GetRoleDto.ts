import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';

export class GetRoleDto {
  @ApiProperty({ example: UUID, description: 'Role ID' })
  @IsUUID(4, { message: 'ID must be a valide UUID ' })
  id: string;
}
