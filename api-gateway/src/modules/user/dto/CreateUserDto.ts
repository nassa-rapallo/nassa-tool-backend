import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EMAIL, PASSWORD, USER } from 'src/shared/constants/model';

export class CreateUserDto {
  @ApiProperty({ example: USER, description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: PASSWORD, description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ example: EMAIL, description: 'User email' })
  @IsEmail()
  email: string;
}
