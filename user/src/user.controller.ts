import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
