import { GetByIdDto } from '../GetByIdDto';

export class ChangePasswordDto extends GetByIdDto {
  newPassword: string;
  link: string;
}
