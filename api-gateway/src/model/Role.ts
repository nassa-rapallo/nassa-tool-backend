import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDate, IsNumber } from 'class-validator';
import { ROLE, UUID } from 'src/shared/constants/model';
import { Group } from './Group';

export class Role {
  @ApiProperty({ example: UUID })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: ROLE })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ADMIN', description: 'Default type, used for quicker checks' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1, description: 'The position of the role in the group hierarchy' })
  @IsNumber()
  position: number;

  @ApiProperty()
  group: Group;

  @ApiProperty()
  @IsString()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
