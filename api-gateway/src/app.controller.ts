import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@Controller()
@ApiTags('app')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @ApiOkResponse({
    description: 'Hello World',
  })
  @Get()
  async getHello(): Promise<string> {
    const hello: string = await firstValueFrom(
      this.userServiceClient.send('user_hello', {}),
    );

    return hello;
  }
}
