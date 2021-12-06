import { SectionService } from 'src/services/section.service';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RuleService } from 'src/services/rule.service';
import { PermissionService } from '../services/permission.service';
import { GetRolesForRule } from 'src/model/permission/response/GetRolesForRule';

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

  @MessagePattern('permission_get_roles_for_rule')
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
          message: 'bad_request',
          data: null,
          errors: ['rule_not_found'],
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'roles_found',
        data: { roles: rule.roles },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal_error',
        data: null,
        errors: ['something_went_wrong'],
      };
    }
  }

  @MessagePattern('permission_is_permitted')
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
