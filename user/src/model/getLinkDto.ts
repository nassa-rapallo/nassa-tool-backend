import { TYPES } from 'src/entities/link.entity';

export class GetLinkDto {
  user_id: string;
  type: TYPES;
}
