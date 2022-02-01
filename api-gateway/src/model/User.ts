import { EMAIL, USER, UUID } from 'src/shared/constants/model';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';

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
  roles: UserRole[];
}

export class UserRole {
  @ApiProperty({ example: UUID, description: 'Id of the UserRole' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: UUID, description: 'Id of the Role' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  roleId: string;

  @ApiProperty({ example: UUID, description: 'Id of the Group' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  groupId: string;
}
