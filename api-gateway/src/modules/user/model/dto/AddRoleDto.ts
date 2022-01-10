import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString()
  userId: string;
  @IsString()
  roleId: string;
}
