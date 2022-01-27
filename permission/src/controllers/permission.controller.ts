import { PERMISSION_GET } from './../model/permission/messages/command';
import { PERMISSION_IS_PERMITTED } from '../model/permission/messages/command';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RuleService } from 'src/services/rule.service';
import {
  PERMISSION_CREATE,
  PERMISSION_GET_ROLES_FOR_RULE,
} from 'src/model/permission/messages/command';
import {
  CREATE_PERMISSION,
  GET_ROLES,
} from 'src/model/permission/messages/response';

import * as Dto from 'src/model/permission/dto';
import * as Responses from 'src/model/permission/responses';

@Controller()
export class PermissionController {
  constructor(private readonly ruleService: RuleService) {}

  @MessagePattern('hello_permission')
  getHello(): string {
    return 'Hello from Permission';
  }

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(PERMISSION_GET)
  async getPermission(
    data: Dto.GetPermissionDto,
  ): Responses.GetPermissionResponse {
    try {
      const action = await this.ruleService.getRuleByAction(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { action },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'bad_request',
        data: undefined,
      };
    }
  }

  @MessagePattern(PERMISSION_CREATE)
  async createPermission(
    data: Dto.CreatePermissionDto,
  ): Responses.CreatePermissionResponse {
    try {
      // search the action in the db
      let responseAction = await this.ruleService.getRuleByAction({
        action: data.action,
      });

      // if no action with the requested name, create a new one
      if (!responseAction)
        responseAction = await this.ruleService.createRule({
          section: data.section,
          action: data.action,
          roles: [data.role],
        });

      // check if the the passed role is already in the action
      // otherwise, add the role in the rule
      if (!responseAction.roles.find((r) => r === data.role)) {
        await this.ruleService.updateRule({
          ruleId: responseAction.id,
          roles: [...responseAction.roles, data.role],
        });

        // this for the cached one, in order to return it in the response object
        // with the updated roles array
        responseAction.roles = [...responseAction.roles, data.role];
      }

      return {
        status: HttpStatus.OK,
        message: CREATE_PERMISSION.OK,
        data: { action: responseAction },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: CREATE_PERMISSION.ERROR,
        data: undefined,
      };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */
  @MessagePattern(PERMISSION_GET_ROLES_FOR_RULE)
  async getRolesForRule(
    @Payload() data: Dto.GetRolesDto,
  ): Responses.GetRolesForRuleResponse {
    try {
      const rule = await this.ruleService.getRuleByAction({
        action: data.action,
      });

      return {
        status: HttpStatus.OK,
        message: GET_ROLES.OK,
        data: { roles: rule.roles },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: GET_ROLES.ERROR,
        data: null,
      };
    }
  }

  @MessagePattern(PERMISSION_IS_PERMITTED)
  async isPermitted(
    @Payload() data: Dto.IsPermittedDto,
  ): Responses.IsPermittedResponse {
    try {
      const { roles } = await this.ruleService.getRuleById({
        id: data.action,
      });

      const sectionPermitted = roles.find((role) => role === data.roles.section)
        ? true
        : false;

      const globalPermitted = roles.find((role) => role === data.roles.global)
        ? true
        : false;

      const isRolePermitted = sectionPermitted || globalPermitted;

      return {
        status: HttpStatus.OK,
        message: isRolePermitted
          ? 'permisssion_is_permitted'
          : 'permission_is_not_permitted',
        data: { permitted: isRolePermitted },
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
