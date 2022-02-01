import { RuleService } from 'src/services/rule.service';
import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import * as C from 'src/model/permission/command';
import * as Dto from 'src/model/permission/dto';
import { PermissionService } from 'src/services/permission.service';
import { message } from 'src/shared/message';
// import * as Response from 'src/model/permission/responses';

@Controller()
export class PermissionController {
  constructor(
    @Inject() private readonly service: PermissionService,
    @Inject() private readonly ruleService: RuleService,
  ) {}

  @MessagePattern('hello_permission')
  getHello(): string {
    return 'Hello from Permission';
  }

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(C.GET_ALL)
  async permissionGetAll() {
    const permissions = await this.service.getAll();

    if (permissions)
      return {
        status: HttpStatus.OK,
        message: message(C.GET_ALL, HttpStatus.OK),
        data: { permissions },
      };

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
      data: undefined,
    };
  }

  @MessagePattern(C.GET)
  async permissionGet(@Payload() data: Dto.Get) {
    try {
      const permission = await this.service.get(data);

      return {
        status: HttpStatus.OK,
        message: message(C.GET, HttpStatus.OK),
        data: { permission },
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
  async permissionCreate(@Payload() data: Dto.Create) {
    const permission = await this.service.create(data);

    if (permission)
      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: { permission: permission },
      };

    return {
      status: HttpStatus.BAD_REQUEST,
      message: message(C.CREATE, HttpStatus.BAD_REQUEST),
      data: undefined,
    };
  }

  @MessagePattern(C.UPDATE)
  async permissionUpdate(@Payload() data: Dto.Update) {
    try {
      const permission = await this.service.update(data);

      return {
        status: HttpStatus.OK,
        message: message(C.UPDATE, HttpStatus.OK),
        data: { permission },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.UPDATE, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.DELETE)
  async permissionDelete(@Payload() data: Dto.Delete) {
    try {
      const permission = await this.service.delete(data);

      return {
        status: HttpStatus.OK,
        message: message(C.DELETE, HttpStatus.OK),
        data: { permission },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.DELETE, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(C.PERMITTED)
  async isPermitted(@Payload() data: Dto.Permitted) {
    try {
      const permission = await this.service.getByAction({
        actionId: data.actionId,
      });

      let isPermitted = false;

      // if there is no permission for the action, then it's not protected
      if (!permission) return true;

      // check for all the user role
      for (const userRole of data.userRoles) {
        // is there a group cluster within the permission configuration?
        const foundRule = permission.rules.find(
          (rule) => rule.groupId === userRole.groupId,
        );

        // if there is, let's check if the userRole is in the cluster
        if (foundRule) {
          isPermitted = foundRule.cluster.includes(userRole.roleId);

          // if it is, break from the loop
          if (isPermitted) break;
        }
      }

      return {
        status: HttpStatus.OK,
        message: isPermitted
          ? 'permission_is_permitted'
          : 'permission_is_not_permitted',
        data: { permitted: isPermitted },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'permission_is_not_permitted',
        data: { permitted: false },
      };
    }
  }
}
