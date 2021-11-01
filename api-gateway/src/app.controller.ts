import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const hello: string = await firstValueFrom(
      this.userServiceClient.send('user_hello', {}),
    );

    return hello;
  }
}
