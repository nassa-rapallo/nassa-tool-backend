import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { RoleService } from 'src/services/role.service';

import * as Dto from 'src/model/role/dto';
import * as C from 'src/model/role/command';
import * as Response from 'src/model/role/responses';
import { message } from 'src/shared/message';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(C.GET_ALL)
  async roleGetAll(): Response.GetAll {
    const roles = await this.roleService.getAll();
    if (!roles)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: message(C.GET_ALL, HttpStatus.OK),
      data: { roles },
    };
  }

  @MessagePattern(C.GET)
  async getRole(@Payload() data: Dto.Get): Response.Get {
    try {
      // find the role
      const role = await this.roleService.get(data);

      return {
        status: HttpStatus.OK,
        message: message(C.GET, HttpStatus.OK),
        data: { role },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.CREATE)
  async createRole(@Payload() data: Dto.Create): Response.Created {
    try {
      const createdRole = await this.roleService.create(data);

      if (!createdRole)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message(C.CREATE, HttpStatus.BAD_REQUEST),
          data: undefined,
        };

      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: { role: createdRole },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.CREATE, HttpStatus.BAD_REQUEST),
        data: null,
      };
    }
  }

  @MessagePattern(C.UPDATE)
  async updateRole(@Payload() data: Dto.Update): Response.Updated {
    try {
      await this.roleService.update(data);

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

  @MessagePattern(C.DELETE)
  async deleteRole(@Payload() data: Dto.Delete): Response.Deleted {
    try {
      await this.roleService.delete(data);

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
}
