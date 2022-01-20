import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/User';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserLink extends DefaultResponse {
  @ApiProperty({ description: 'User & link data' })
  data: {
    user: Partial<User>;
    link?: string;
  };
}
