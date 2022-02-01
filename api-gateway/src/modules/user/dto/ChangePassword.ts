import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { PASSWORD, UUID } from 'src/shared/constants/model';

export class ChangePassword {
  @ApiProperty({ example: UUID, description: 'ID of the user' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;

  @ApiProperty({ example: PASSWORD, description: 'New password' })
  @IsString()
  newPassword: string;

  @ApiProperty({ description: 'Token associated with this operation' })
  @IsString()
  link: string;
}
