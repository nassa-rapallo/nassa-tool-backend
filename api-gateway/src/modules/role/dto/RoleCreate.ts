import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from '../Types';

export class RoleCreate {
  roleData: RoleData;

  @IsString()
  groupId: string;
}

export class RoleData {
  @ApiProperty({ description: 'Name of the role' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Position of the role inside of the group' })
  @IsNumber()
  position: number;

  @ApiProperty({ description: 'Special type for default roles' })
  @IsOptional()
  @IsEnum(Types)
  type?: Types;
}
