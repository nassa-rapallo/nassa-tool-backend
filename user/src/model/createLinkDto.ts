import { TYPES } from 'src/entities/link.entity';

export class CreateLinkDto {
  user_id: string;
  type: TYPES;
}
