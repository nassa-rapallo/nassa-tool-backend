import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/lib/Response';

const EMPTY_ERRORS = [''];

const handleResponse = (res: Response<unknown> | string) => {
  if (typeof res === 'string') return res;

  if (res.status < 400 || res.statusCode < 400) return res;

  throw new HttpException(
    {
      message: res.message,
      data: null,
      errors: res.errors ? res.errors : EMPTY_ERRORS,
    },
    res.status ? res.status : res.statusCode,
  );
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((res) => handleResponse(res)));
  }
}
