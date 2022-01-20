import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';
export class UserChangePassword extends DefaultResponse {
  @ApiProperty({
    example: { changed: true },
    description: 'Wether the user has changed their password',
  })
  data: {
    changed: boolean;
  };
}
