import { Controller, Inject, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GroupService } from 'src/services/group.service';

import { responseMessage as message } from 'src/shared/responseMessage';
import * as Dto from 'src/model/group/dto';
import * as C from 'src/model/group/command';
import * as Response from 'src/model/group/responses';

@Controller()
export class GroupController {
  constructor(@Inject() private readonly service: GroupService) {}

  @MessagePattern(C.GET_ALL)
  async groupGetAll(): Response.GetAll {
    const groups = await this.service.groupGetAll();
    if (!groups)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: message(C.GET_ALL, HttpStatus.OK),
      data: { groups },
    };
  }

  @MessagePattern(C.GET)
  async groupGet(data: Dto.GroupGet): Response.Get {
    try {
      const group = await this.service.groupGet(data);

      return {
        status: HttpStatus.OK,
        message: message(C.GET, HttpStatus.OK),
        data: { group },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.GET_BY_NAME)
  async groupGetByName(data: Dto.GroupGetByName): Response.Get {
    try {
      const group = await this.service.groupGetbyName(data);

      return {
        status: HttpStatus.OK,
        message: message(C.GET, HttpStatus.OK),
        data: { group },
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
  async groupCreate(data: Dto.GroupCreate): Response.Created {
    const group = await this.service.groupCreate(data);

    if (group)
      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: { group },
      };

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message(C.CREATE, HttpStatus.BAD_REQUEST),
      data: undefined,
    };
  }

  @MessagePattern(C.UPDATE)
  async groupUpdate(data: Dto.GroupUpdate): Response.Updated {
    try {
      await this.service.groupUpdate(data);

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
  async groupDelete(data: Dto.GroupDelete): Response.Deleted {
    try {
      await this.service.groupDelete(data);

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
