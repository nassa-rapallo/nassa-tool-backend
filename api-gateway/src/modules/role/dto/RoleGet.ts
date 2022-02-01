import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleGet {
  @ApiProperty({ description: 'Role ID' })
  @IsUUID(4)
  id: string;
}
