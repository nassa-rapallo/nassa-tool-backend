import { IsString, IsUUID } from 'class-validator';

export class Create {
  @IsString()
  @IsUUID(4)
  userId: string;
}
