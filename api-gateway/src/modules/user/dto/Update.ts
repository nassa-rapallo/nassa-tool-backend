import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/User';
import { Get } from './Get';

export class Update extends Get {
  @ApiProperty({ description: 'User data to update' })
  userData: Partial<User>;
}
