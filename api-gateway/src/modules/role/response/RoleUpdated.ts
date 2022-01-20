import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';
import { Role } from 'src/model/Role';

export class RoleUpdated extends DefaultResponse {
  @ApiProperty()
  data: {
    updated: boolean;
    role: Partial<Role>;
  };
}
