import { GetByIdDto } from '../GetByIdDto';
import { RoleDto } from './RoleDto';

export class UpdateRoleDto extends GetByIdDto {
  roleData: Partial<RoleDto>;
}
