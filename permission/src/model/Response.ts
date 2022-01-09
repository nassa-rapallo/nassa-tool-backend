import { HttpStatus } from '@nestjs/common';

export type Response<Data> = {
  status: HttpStatus;
  message: string;
  data: Data | undefined;
  errors?: string[];
};
