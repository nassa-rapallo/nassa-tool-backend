import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/lib/Response';

const EMPTY_ERRORS = [''];
const GOOD_STATUS = [HttpStatus.OK, HttpStatus.FOUND, HttpStatus.CREATED];

const handleResponse = (res: Response<unknown> | string) => {
  if (typeof res === 'string') return res;

  if (GOOD_STATUS.includes(res.status)) return res;

  throw new HttpException(
    {
      message: res.message,
      data: null,
      errors: res.errors ? res.errors : EMPTY_ERRORS,
    },
    HttpStatus.NOT_FOUND,
  );
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((res) => handleResponse(res)));
  }
}
