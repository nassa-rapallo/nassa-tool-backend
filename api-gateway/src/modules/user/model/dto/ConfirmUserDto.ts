import { IsString } from 'class-validator';
export class ConfirmUserDto {
  @IsString()
  link: string;
}