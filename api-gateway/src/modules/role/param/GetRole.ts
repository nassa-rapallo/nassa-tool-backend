import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'src/shared/constants/model';

export class GetRole {
  @ApiProperty({ example: UUID, description: 'ID of the role to be found' })
  @IsUUID(4, { message: 'ID must be a valid UUID' })
  id: string;
}
