import { User } from 'src/entities/user.entity';
import { GetByIdDto } from '../../GetByIdDto';

export class Update extends GetByIdDto {
  userData: Partial<User>;
}
