import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/model/User';
import { UserIdDto } from './UserIdDto';

export class UpdateUserDto extends UserIdDto {
  @ApiProperty({ description: 'User data to update' })
  userData: Partial<User>;
}
