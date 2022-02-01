import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/model/Role';
import { RoleGet } from './RoleGet';

export class RoleUpdate extends RoleGet {
  @ApiProperty({ description: 'Data to update' })
  roleData: Partial<Role>;
}
