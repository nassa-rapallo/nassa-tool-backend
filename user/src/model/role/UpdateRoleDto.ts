import { Role } from 'src/entities/role.entity';
import { GetByIdDto } from '../GetByIdDto';

export class UpdateRoleDto extends GetByIdDto {
  roleData: Partial<Role>;
}
