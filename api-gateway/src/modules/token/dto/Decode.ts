import { IsString } from 'class-validator';

export class Decode {
  @IsString()
  token: string;
}
