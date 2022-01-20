import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';
import { SECTION, UUID } from 'src/shared/constants/model';

export class IsAdminDto {
  @ApiProperty({ example: UUID, description: 'ID of the user' })
  @IsString()
  @IsUUID(4, { message: 'ID must be an UUID' })
  userId: string;

  @ApiProperty({
    example: SECTION,
    description:
      'Section to check. If not specified, then the user must be a global admin',
  })
  @IsOptional()
  @IsString()
  section?: string;
}
