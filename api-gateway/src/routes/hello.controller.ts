import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, Get, UseInterceptors } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import {
  BOOK_SERVICE,
  MAILER_SERVICE,
  PERMISSION_SERVICE,
  TOKEN_SERVICE,
  USER_SERVICE,
} from 'src/services/clients/clientsName';

import { ResponseInterceptor } from 'src/services/interceptor/response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('hello')
export class HelloController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionServiceClient: ClientProxy,
    @Inject(MAILER_SERVICE) private readonly mailerServiceClient: ClientProxy,
    @Inject(BOOK_SERVICE) private readonly bookServiceClient: ClientProxy,
  ) {}

  @Get('/user')
  async user(): Promise<string> {
    return firstValueFrom(this.userServiceClient.send('hello_user', {}));
  }

  @Get('/token')
  async token(): Promise<string> {
    return firstValueFrom(this.tokenServiceClient.send('hello_token', {}));
  }

  @Get('/mailer')
  async mailer(): Promise<string> {
    return firstValueFrom(this.mailerServiceClient.send('hello_mailer', {}));
  }

  @Get('/permission')
  async permission(): Promise<string> {
    return firstValueFrom(this.permissionServiceClient.send('hello_permission', {}));
  }

  @Get('/book')
  async book(): Promise<string> {
    return firstValueFrom(this.bookServiceClient.send('hello_book', {}));
  }
}
