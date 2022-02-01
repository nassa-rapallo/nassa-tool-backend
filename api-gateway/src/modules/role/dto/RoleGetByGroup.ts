import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RoleGetByGroup {
  @ApiProperty({ description: 'ID of the group' })
  @IsUUID(4)
  groupId: string;
}
