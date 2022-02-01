import { Role } from 'src/entities/role.entity';
import { RoleGet } from './RoleGet';
export class RoleUpdate extends RoleGet {
  roleData: Partial<Role>;
}
