import { UserLinkResponse, UserResponse } from './../responses/UserResponses';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../model/user/CreateUserDto';
import { UserCredentialsDto } from '../model/user/UserCredentialsDto';
import {
  USER_ADD_ROLE,
  USER_CREATE,
  USER_GET_ALL,
  USER_SEARCH_BY_CREDENTIALS,
  USER_SEARCH_BY_ID,
} from '../messages/command';
import {
  ADD_ROLE_TO_USER,
  CREATE_USER,
  SEARCH_BY_CREDENTIALS,
  SEARCH_BY_ID,
} from '../messages/response';
import { UserSearchResponse } from '../responses/UserResponses';
import { RoleService } from 'src/services/role.service';
import { Connection } from 'typeorm';
import { LinkService } from 'src/services/link.service';
import { TYPES } from 'src/entities/link.entity';
import { AddRoleDto } from 'src/model/user/AddRoleDto';
import { GetByIdDto } from 'src/model/GetByIdDto';

@Controller()
export class UserController {
  constructor(
    private readonly connection: Connection,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly linkService: LinkService,
  ) {}

  @MessagePattern('hello_user')
  getHello(): string {
    return 'Hello from User';
  }

  @MessagePattern(USER_CREATE)
  async createUser(@Payload() createUser: CreateUserDto): UserLinkResponse {
    try {
      const created = await this.userService.createUser(createUser);
      if (!created)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: CREATE_USER.BAD_REQUEST,
          data: null,
        };

      const userLink = await this.linkService.createLink({
        user_id: created.id,
        type: TYPES.CONFIRM,
      });

      return {
        status: HttpStatus.CREATED,
        message: CREATE_USER.CREATED,
        data: {
          user: created,
          link: await this.linkService.getWebLink({ link: userLink.link }),
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: CREATE_USER.BAD_REQUEST,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(USER_GET_ALL)
  async getAllUsers() {
    try {
      const users = await this.userService.getUsers();

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { users },
      };
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'not found',
        data: null,
      };
    }
  }

  @MessagePattern(USER_SEARCH_BY_CREDENTIALS)
  async getUserByCredentials(
    @Payload() userCredentials: UserCredentialsDto,
  ): UserSearchResponse {
    // WRONG REQUEST
    if (!userCredentials || !userCredentials.email || !userCredentials.password)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_CREDENTIALS.NOT_FOUND,
        data: null,
      };

    const user = await this.userService.searchByEmail({
      email: userCredentials.email,
    });

    // WRONG EMAIL
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_CREDENTIALS.NOT_FOUND,
        data: null,
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
        data: null,
      };
    }

    // SUCCESS
    return {
      status: HttpStatus.FOUND,
      message: SEARCH_BY_CREDENTIALS.SUCCESS,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      },
    };
  }

  @MessagePattern(USER_SEARCH_BY_ID)
  public async getUserById(@Payload() data: GetByIdDto): UserSearchResponse {
    // WRONG DATA
    if (!data.id)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: SEARCH_BY_ID.BAD_REQUEST,
        data: null,
      };

    const user = await this.userService.searchById({ id: data.id });

    // WRONG ID
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: SEARCH_BY_ID.NOT_FOUND,
        data: null,
      };

    // SUCCESS
    return {
      status: HttpStatus.FOUND,
      message: SEARCH_BY_ID.SUCCESS,
      data: { user },
    };
  }

  @MessagePattern(USER_ADD_ROLE)
  public async addRoleToUser(@Payload() data: AddRoleDto): UserResponse {
    const user = await this.userService.searchById({ id: data.userId });
    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: ADD_ROLE_TO_USER.USER_NOT_FOUND,
        data: null,
      };

    const role = await this.roleService.getRoleById({ id: data.roleId });

    if (!role)
      return {
        status: HttpStatus.NOT_FOUND,
        message: ADD_ROLE_TO_USER.ROLE_NOT_FOUND,
        data: null,
      };

    const sectionIdx = user.roles.findIndex((r) => r.section === role.section);

    if (sectionIdx !== -1)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: ADD_ROLE_TO_USER.BAD_REQUEST,
        data: null,
      };

    user.roles = [role, ...user.roles];

    try {
      const updatedUser = await this.connection.manager.save(user);

      return {
        status: HttpStatus.OK,
        message: ADD_ROLE_TO_USER.SUCCESS,
        data: { user: updatedUser },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: ADD_ROLE_TO_USER.BAD_REQUEST,
        data: null,
      };
    }
  }
}
