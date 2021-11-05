import { ClientProxy } from '@nestjs/microservices';
import { Controller, Inject, Get } from '@nestjs/common';
import { PERMISSION_SERVICE, TOKEN_SERVICE, USER_SERVICE } from 'src/clients';
import { firstValueFrom } from 'rxjs';
@Controller('hello')
export class HelloController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(TOKEN_SERVICE) private readonly tokenServiceClient: ClientProxy,
    @Inject(PERMISSION_SERVICE)
    private readonly permissionServiceClient: ClientProxy,
  ) {}

  @Get('/user')
  async user(): Promise<string> {
    return firstValueFrom(this.userServiceClient.send('hello_user', {}));
  }

  @Get('/token')
  async token(): Promise<string> {
    return firstValueFrom(this.tokenServiceClient.send('hello_token', {}));
  }

  @Get('/permission')
  async permission(): Promise<string> {
    return firstValueFrom(
      this.permissionServiceClient.send('hello_permission', {}),
    );
  }
}
