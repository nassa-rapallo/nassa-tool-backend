import { ApiProperty } from '@nestjs/swagger';
// export type MailResponse = Response<boolean>;

import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class MailResponse extends DefaultResponse {
  @ApiProperty({
    example: { mailed: true },
    description: 'If the mailing operation has been completed',
  })
  data: {
    mailed: boolean;
  };
}
