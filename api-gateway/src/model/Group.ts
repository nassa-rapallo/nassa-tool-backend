import { CODENAME } from './../shared/constants/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { GROUP, UUID } from 'src/shared/constants/model';
import { Role } from './Role';

export class Group {
  @ApiProperty({ example: UUID })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: GROUP, description: 'Name of the group' })
  @IsString()
  name: string;

  @ApiProperty({
    example: CODENAME,
    description: 'Codename of the group, fixed, used for api calls',
  })
  @IsString()
  codeName: string;

  @ApiProperty({ description: 'Roles inside the group' })
  roles: Role[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;
}
