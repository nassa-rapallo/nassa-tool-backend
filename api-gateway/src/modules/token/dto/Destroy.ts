import { IsString, IsUUID } from 'class-validator';

export class Destroy {
  @IsString()
  @IsUUID()
  userId: string;
}
