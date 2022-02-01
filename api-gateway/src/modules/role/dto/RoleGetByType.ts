import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { Types } from '../Types';

export class RoleGetByType {
  @ApiProperty()
  @IsUUID(4)
  groupId: string;

  @ApiProperty()
  @IsEnum(Types)
  type: Types;
}
