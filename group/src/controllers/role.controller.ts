import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { RoleService } from 'src/services/role.service';
import { GroupService } from 'src/services/group.service';

import { responseMessage as message } from 'src/shared/responseMessage';
import * as Dto from 'src/model/role/dto';
import * as C from 'src/model/role/command';
import * as Response from 'src/model/role/responses';

@Controller()
export class RoleController {
  constructor(
    @Inject() private readonly service: RoleService,
    @Inject() private readonly groupService: GroupService,
  ) {}

  @MessagePattern(C.GET_ALL)
  async roleGetAll(): Response.GetAll {
    const roles = await this.service.roleGetAll();

    if (roles)
      return {
        status: HttpStatus.OK,
        message: message(C.GET_ALL, HttpStatus.OK),
        data: { roles },
      };

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
      data: undefined,
    };
  }

  @MessagePattern(C.GET_BY_GROUP)
  async roleGetByGroup(data: Dto.RoleGetByGroup): Response.GetAll {
    const roles = await this.service.roleGetByGroup(data);

    if (roles)
      return {
        status: HttpStatus.OK,
        message: message(C.GET_BY_GROUP, HttpStatus.OK),
        data: { roles },
      };

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message(C.GET_BY_GROUP, HttpStatus.BAD_REQUEST),
      data: undefined,
    };
  }

  @MessagePattern(C.GET_GROUP_TYPE)
  async roleGetGroupAdmin(data: Dto.RoleGetByType): Response.Get {
    try {
      const role = await this.service.roleGetByType(data);

      return {
        status: HttpStatus.OK,
        message: message(C.GET_GROUP_TYPE, HttpStatus.OK),
        data: { role },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET_GROUP_TYPE, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.GET)
  async roleGet(data: Dto.RoleGet): Response.Get {
    try {
      const role = await this.service.roleGet(data);

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
  async roleCreate(data: Dto.RoleCreate): Response.Created {
    try {
      // get the group by its ID
      const group = await this.groupService.groupGet({ id: data.groupId });

      // create a new role, with a temporary position
      const role = await this.service.roleCreate({
        group: group,
        roleData: { ...data.roleData, position: -1 },
      });

      // if the role creating went wrong, return the error
      if (!role)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: message(C.CREATE, HttpStatus.BAD_REQUEST),
          data: undefined,
        };

      // the role has been created, now we check if the position is already occupied
      const rolesByGroup = await this.service.roleGetByGroup({
        groupId: data.groupId,
      });

      // first we check if there are other roles in this group
      if (rolesByGroup) {
        const roleWithPosition = rolesByGroup.find(
          (role) => role.position === data.roleData.position,
        );

        // then we check if the position is occupied
        if (roleWithPosition) {
          const rolesToMove = rolesByGroup
            .filter((role) => role.position < data.roleData.position)
            .reverse();

          // if it is, we move all the roles to the next position
          for (const toMove of rolesToMove) {
            await this.service.roleMovePosition({
              id: toMove.id,
              newPosition: toMove.position + 1,
            });
          }
        }
      }

      // and finally we assign the correct position to the one just created
      await this.service.roleMovePosition({
        id: role.id,
        newPosition: data.roleData.position,
      });

      role.position = data.roleData.position;

      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: { role },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.CREATE, HttpStatus.INTERNAL_SERVER_ERROR),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.UPDATE)
  async roleUpdate(data: Dto.RoleUpdate): Response.Updated {
    try {
      await this.service.roleUpdate(data);
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
  async roleDelete(data: Dto.RoleDelete): Response.Deleted {
    try {
      await this.service.roleDelete(data);
      return {
        status: HttpStatus.OK,
        message: message(C.UPDATE, HttpStatus.OK),
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.UPDATE, HttpStatus.BAD_REQUEST),
        data: { deleted: false },
      };
    }
  }
}
