import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/model/Role';
import { ROLE } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class RoleSearchAllResponse extends DefaultResponse {
  @ApiProperty({ example: [ROLE, ROLE], description: 'All roles' })
  data: { roles: Array<Partial<Role>> };
}
