import { IsUUID } from 'class-validator';

export class UserGet {
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;
}
