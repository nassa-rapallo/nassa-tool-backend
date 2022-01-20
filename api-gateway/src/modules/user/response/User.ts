import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from 'src/model/User';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class User extends DefaultResponse {
  @ApiProperty({ description: 'User data' })
  data: {
    user: Partial<UserModel>;
  };
}
