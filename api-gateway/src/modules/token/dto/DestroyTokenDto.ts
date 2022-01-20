import { IsString } from 'class-validator';

export class DestroyTokenDto {
  @IsString()
  userId: string;
}
