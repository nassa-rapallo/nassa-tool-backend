import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from 'src/shared/constants/model';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class PermissionGetRoles extends DefaultResponse {
  @ApiProperty({
    example: [ROLE, ROLE, ROLE],
    description: 'Roles associated with the given rule',
  })
  data: {
    roles: string[];
  };
}
