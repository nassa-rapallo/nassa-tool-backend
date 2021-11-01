import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './services/user.service';
import { createUserDto } from './model/createUserDto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user_hello')
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern('user_create_user')
  createUser(@Payload() createUser: createUserDto) {
    return this.userService.createUser(createUser);
  }

  @MessagePattern('user_get_all_users')
  getAllUsers() {
    return this.userService.getUsers();
  }
}
