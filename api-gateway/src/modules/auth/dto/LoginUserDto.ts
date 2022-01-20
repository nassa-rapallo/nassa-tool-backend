import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EMAIL, PASSWORD } from 'src/shared/constants/model';

export class LoginUserDto {
  @ApiProperty({ example: EMAIL, description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: PASSWORD, description: 'Password of the user' })
  @IsString()
  password: string;
}
