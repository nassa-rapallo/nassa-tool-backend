import { User } from 'src/entities/user.entity';
import { GetByIdDto } from '../GetByIdDto';

export class UpdateUserDto extends GetByIdDto {
  userData: Partial<User>;
}
