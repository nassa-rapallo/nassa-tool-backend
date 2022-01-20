import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/User';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserSearchResponse extends DefaultResponse {
  @ApiProperty({ description: 'User data' })
  data: {
    user: Partial<User>;
  };
}
