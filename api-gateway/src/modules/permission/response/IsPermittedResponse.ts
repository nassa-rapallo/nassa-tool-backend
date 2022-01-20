import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class IsPermittedResponse extends DefaultResponse {
  @ApiProperty({
    example: { permitted: true },
    description: "Check if the action is permitted with by the user's role",
  })
  data: { permitted: boolean };
}
