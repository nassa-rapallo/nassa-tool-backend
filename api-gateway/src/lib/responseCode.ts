import { HttpStatus } from '@nestjs/common';

export const isOk = (status: number): boolean => {
  return (
    status === HttpStatus.OK ||
    status === HttpStatus.CREATED ||
    status === HttpStatus.FOUND
  );
};
