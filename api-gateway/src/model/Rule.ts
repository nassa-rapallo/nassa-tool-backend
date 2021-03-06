import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';
import { ACTION, UUID } from 'src/shared/constants/model';

export class Rule {
  @ApiProperty({ example: UUID, description: 'ID of the Rule' })
  @IsString()
  @IsUUID(4, { message: 'id must be an UUID' })
  id: string;

  @ApiProperty({ description: 'Section in which the rule is nested in' })
  @IsUUID(4, { message: 'ID must be un UUID' })
  section: string;

  @ApiProperty({ example: ACTION, description: 'Name of the action' })
  @IsString()
  action: string;

  @ApiProperty({
    example: [UUID, UUID],
    description: 'Array of the roles ids that can do the action',
  })
  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
