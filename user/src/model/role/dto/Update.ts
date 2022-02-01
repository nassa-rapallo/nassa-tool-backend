import { Role } from 'src/entities/role.entity';
import { Get } from './Get';

export class Update extends Get {
  roleData: Partial<Role>;
}
