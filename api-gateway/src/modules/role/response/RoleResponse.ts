import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/model/Role';
import { ROLE } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class RoleResponse extends DefaultResponse {
  @ApiProperty({ example: ROLE, description: 'Return role information' })
  data: { role: Partial<Role> };
}
