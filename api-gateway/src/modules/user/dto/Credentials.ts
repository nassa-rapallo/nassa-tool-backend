import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EMAIL, PASSWORD } from 'src/shared/constants/model';

export class Credentials {
  @ApiProperty({ example: EMAIL, description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: PASSWORD, description: 'User password' })
  @IsString()
  password: string;
}
