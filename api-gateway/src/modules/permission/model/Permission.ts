import { IsString } from 'class-validator';

export class Permission {
  @IsString()
  role: string;
  @IsString()
  action: string;
  @IsString()
  section: string;
}
