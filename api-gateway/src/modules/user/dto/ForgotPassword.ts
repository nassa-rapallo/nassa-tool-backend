import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';

export class ForgotPassword {
  @ApiProperty({ example: UUID, description: 'ID of the user' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  id: string;
}