import { PERMISSION_IS_PERMITTED } from './../messages/command';
import { SectionService } from 'src/services/section.service';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RuleService } from 'src/services/rule.service';
import { PermissionService } from '../services/permission.service';
import { GetRolesForRule } from 'src/model/permission/response/GetRolesForRule';
import { CreatePermission } from 'src/model/permission/response/CreatePermission';
import {
  PERMISSION_CREATE,
  PERMISSION_GET_ROLES_FOR_RULE,
} from 'src/messages/command';
import { CREATE_PERMISSION, GET_ROLES } from 'src/messages/response';

@Controller()
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly ruleService: RuleService,
    private readonly sectionService: SectionService,
  ) {}

  @MessagePattern('hello_permission')
  getHello(): string {
    return 'Hello from Permission';
  }

  @MessagePattern(PERMISSION_CREATE)
  async createPermission(data: {
    section: string;
    action: string;
    role: string;
  }): Promise<CreatePermission> {
    try {
      // search for the section in the db
      let responseSection = await this.sectionService.getSectionByName({
        name: data.section,
      });

      // if no section with that name, create a new one
      if (!responseSection)
        responseSection = await this.sectionService.createSection({
          name: data.section,
        });

      // search the action in the db
      let responseAction = await this.ruleService.getRuleByAction({
        action: data.action,
      });

      // if no action with the requested name, create a new one
      if (!responseAction)
        responseAction = await this.ruleService.createRule({
          sectionId: responseSection.id,
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
        data: { action: responseAction, section: responseSection },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: CREATE_PERMISSION.ERROR,
        data: undefined,
      };
    }
  }

  @MessagePattern(PERMISSION_GET_ROLES_FOR_RULE)
  async getRolesForRule(
    @Payload() data: { section: string; action: string },
  ): Promise<GetRolesForRule> {
    try {
      const section = await this.sectionService.getSectionByName({
        name: data.section,
      });

      const rule = section.rules.find((rule) => rule.action === data.action);

      if (!rule) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: GET_ROLES.BAD_REQUEST,
          data: null,
          errors: ['rule_not_found'],
        };
      }

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
        errors: ['something_went_wrong'],
      };
    }
  }

  @MessagePattern(PERMISSION_IS_PERMITTED)
  async isPermitted(
    @Payload() data: { roleId: string; section: string; action: string },
  ): Promise<boolean> {
    const roles = await this.getRolesForRule({
      section: data.section,
      action: data.action,
    });

    if (!roles.data) return false;

    const isRolePermitted = roles.data.roles.findIndex(
      (role) => role === data.roleId,
    );

    return isRolePermitted < 0 ? false : true;
  }
}
