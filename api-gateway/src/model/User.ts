import { EMAIL, USER, UUID } from 'src/shared/constants/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';
import { Role } from './Role';

export class User {
  @ApiProperty({ example: UUID, description: 'Id of the User' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: USER, description: 'Name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: EMAIL, description: 'Email of the user' })
  @IsEmail()
  email: string;

  @IsArray({ message: 'Role must be in array type' })
  roles: Role[];
}
