import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Types } from '../Types';

export class RoleGetByType {
  @ApiProperty()
  @IsString()
  groupCodeName: string;

  @ApiProperty()
  @IsEnum(Types)
  type: Types;
}
