import { GetByIdDto } from '../GetByIdDto';

export class ChangingPasswordDto extends GetByIdDto {
  operation: boolean;
}
