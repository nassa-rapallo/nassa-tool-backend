import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { ACTION, UUID } from 'src/shared/constants/model';
import { Rule } from './Rule';

export class Permission {
  @ApiProperty({ example: UUID })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: UUID, description: 'In which section is the permission' })
  @IsString()
  section: string;

  @ApiProperty({
    example: UUID,
    description: 'For which action the role has now permission',
  })
  @IsString()
  @IsUUID(4, { message: 'action must be an UUID' })
  actionId: string;

  @ApiProperty({
    example: ACTION,
    description: 'For which action the role has now permission',
  })
  @IsString()
  actionName: string;

  @ApiProperty({
    example: UUID,
    description: 'For which action the role has now permission',
  })
  @IsString()
  decription: string;

  @ApiProperty()
  rules: Rule[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
