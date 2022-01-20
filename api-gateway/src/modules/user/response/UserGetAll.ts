import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/User';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserGetAll extends DefaultResponse {
  @ApiProperty({ description: 'Every users' })
  data: {
    users: User[];
  };
}
