import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  section: string;

  @IsString()
  name: string;
}
