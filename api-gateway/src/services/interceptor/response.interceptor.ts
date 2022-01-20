import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

const handleResponse = (res: DefaultResponse | string) => {
  if (typeof res === 'string') return res;

  if (res.status < 400) return res;

  throw new HttpException(
    {
      message: res.message,
      data: null,
    },
    res.status,
  );
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((res) => handleResponse(res)));
  }
}
