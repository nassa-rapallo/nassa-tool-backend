import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  id: string;

  @IsString()
  newPassword: string;

  @IsString()
  link: string;
}
