import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

import { TYPES } from 'src/entities/link.entity';
import { RoleService } from 'src/services/role.service';
import { LinkService } from 'src/services/link.service';

import * as C from 'src/model/user/command';
import * as Dto from 'src/model/user/dto';
import * as Response from 'src/model/user/responses';
import { message } from 'src/shared/message';

@Controller()
export class UserController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly linkService: LinkService,
  ) {}

  @MessagePattern('hello_user')
  getHello(): string {
    return 'Hello from User';
  }

  @MessagePattern(C.CREATE)
  async createUser(@Payload() data: Dto.Create): Response.UserLink {
    try {
      const created = await this.userService.create(data);
      if (!created)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message(C.CREATE, HttpStatus.BAD_REQUEST),
          data: undefined,
        };

      const userLink = await this.linkService.create({
        user_id: created.id,
        type: TYPES.CONFIRM,
      });

      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: {
          user: created,
          link: await this.linkService.getWebLink({ link: userLink.link }),
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.CREATE, HttpStatus.INTERNAL_SERVER_ERROR),
        data: null,
      };
    }
  }

  @MessagePattern(C.DELETE)
  async deleteUser(@Payload() data: Dto.Get): Response.UserDeleted {
    try {
      await this.userService.delete(data);

      return {
        status: HttpStatus.OK,
        message: message(C.DELETE, HttpStatus.OK),
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.DELETE, HttpStatus.BAD_REQUEST),
        data: { deleted: false },
      };
    }
  }

  @MessagePattern(C.UPDATE)
  async updateUser(@Payload() data: Dto.Update): Response.UserUpdated {
    try {
      await this.userService.update(data);

      return {
        status: HttpStatus.OK,
        message: message(C.UPDATE, HttpStatus.OK),
        data: { updated: true },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.UPDATE, HttpStatus.BAD_REQUEST),
        data: { updated: false },
      };
    }
  }

  @MessagePattern(C.GET_ALL)
  async getAllUsers(): Response.UserGetAll {
    try {
      const users = await this.userService.getAll();

      return {
        status: HttpStatus.OK,
        message: message(C.GET_ALL, HttpStatus.OK),
        data: { users },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.GET)
  public async getUserById(@Payload() data: Dto.Get): Response.UserGet {
    const user = await this.userService.get({ id: data.id });

    if (!user)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET, HttpStatus.BAD_REQUEST),
        data: undefined,
      };

    // SUCCESS
    return {
      status: HttpStatus.OK,
      message: message(C.GET, HttpStatus.OK),
      data: { user },
    };
  }

  @MessagePattern(C.SEARCH_BY_CREDENTIALS)
  async getUserByCredentials(
    @Payload() userCredentials: Dto.Credentials,
  ): Response.UserGet {
    const user = await this.userService.getByEmail({
      email: userCredentials.email,
    });

    // WRONG EMAIL
    if (!user)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.SEARCH_BY_CREDENTIALS, HttpStatus.BAD_REQUEST),
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
        status: HttpStatus.BAD_REQUEST,
        message: message(C.SEARCH_BY_CREDENTIALS, HttpStatus.BAD_REQUEST),
        data: null,
      };
    }

    // SUCCESS
    return {
      status: HttpStatus.OK,
      message: message(C.SEARCH_BY_CREDENTIALS, HttpStatus.OK),
      data: {
        user,
      },
    };
  }

  @MessagePattern(C.ADD_ROLE)
  public async addRoleToUser(@Payload() data: Dto.AddRole): Response.UserGet {
    try {
      const user = await this.userService.get({ id: data.userId });
      const role = await this.roleService.getByCluster({
        roleId: data.roleId,
        groupId: data.groupId,
      });

      if (!role)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message(C.ADD_ROLE, HttpStatus.BAD_REQUEST),
          data: undefined,
        };

      const cleanedRoles = user.roles.filter((u) => u.groupId === role.groupId);
      const newRoles = [...cleanedRoles, role];

      user.roles = [...newRoles];

      await this.userService.save({ user });

      return {
        status: HttpStatus.OK,
        message: message(C.ADD_ROLE, HttpStatus.OK),
        data: { user },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.ADD_ROLE, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }
}
