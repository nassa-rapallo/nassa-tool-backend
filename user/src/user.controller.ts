import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './services/user.service';
import { createUserDto } from './model/createUserDto';
import { UserCredentialsDto } from './model/userCredentialsDto';
import { UserSearchResponse } from './responses/UserSearchResponse';
import {
  USER_CREATE,
  USER_GET_ALL,
  USER_SEARCH_BY_CREDENTIALS,
  USER_SEARCH_BY_ID,
} from './messages/command';
import { SEARCH_BY_CREDENTIALS, SEARCH_BY_ID } from './messages/response';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('hello_user')
  getHello(): string {
    return 'Hello from User';
  }

  @MessagePattern(USER_CREATE)
  createUser(@Payload() createUser: createUserDto) {
    return this.userService.createUser(createUser);
  }

  @MessagePattern(USER_GET_ALL)
  getAllUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern(USER_SEARCH_BY_CREDENTIALS)
  async getUserByCredentials(
    @Payload() userCredentials: UserCredentialsDto,
  ): Promise<UserSearchResponse> {
    // WRONG REQUEST
    if (!userCredentials || !userCredentials.email || !userCredentials.password)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_CREDENTIALS.NOT_FOUND,
        user: null,
      };

    const user = await this.userService.searchByEmail({
      email: userCredentials.email,
    });

    // WRONG EMAIL
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_CREDENTIALS.NOT_FOUND,
        user: null,
      };

    // CHECK PASSWORD
    const verifiedPassword = await this.userService.verifyPassword(
      user,
      userCredentials.password,
    );

    // WRONG PASSWORD
    if (!verifiedPassword) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_CREDENTIALS.NOT_MATCH,
        user: null,
      };
    }

    // SUCCESS
    return {
      status: HttpStatus.OK,
      message: SEARCH_BY_CREDENTIALS.SUCCESS,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  @MessagePattern(USER_SEARCH_BY_ID)
  public async getUserById(
    @Payload() data: { id: string },
  ): Promise<UserSearchResponse> {
    // WRONG DATA
    if (!data.id)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: SEARCH_BY_ID.BAD_REQUEST,
        user: null,
      };

    const user = await this.userService.searchById({ id: data.id });

    // WRONG ID
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_ID.NOT_FOUND,
        user: null,
      };

    // SUCCESS
    return {
      status: HttpStatus.OK,
      message: SEARCH_BY_ID.SUCCESS,
      user,
    };
  }
}
