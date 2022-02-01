import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';
import { Permission } from './Permission';

export class Rule {
  @ApiProperty({ example: UUID, description: 'ID of the Rule' })
  @IsString()
  @IsUUID(4, { message: 'id must be an UUID' })
  id: string;

  @ApiProperty({ description: 'Group in which the rule is nested in' })
  @IsUUID(4, { message: 'ID must be un UUID' })
  groupId: string;

  @ApiProperty({ description: 'The role cluster for the rule' })
  @IsString({ each: true })
  cluster: string[];

  @ApiProperty({})
  permission: Permission;

  @ApiProperty({})
  @IsDate()
  createdAt: Date;

  @ApiProperty({})
  @IsDate()
  updatedAt: Date;
}
