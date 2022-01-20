import { DeleteRoleDto } from './../model/role/DeleteRoleDto';
import {
  GET_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from './../messages/response';
import {
  ROLE_CREATE,
  ROLE_DELETE,
  ROLE_GET,
  ROLE_UPDATE,
} from './../messages/command';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { ROLE_GET_ALL } from 'src/messages/command';
import { RoleService } from 'src/services/role.service';
import {
  RoleSearchAllResponse,
  RoleResponse,
  RoleDeletedResponse,
  RoleUpdatedResponse,
} from 'src/responses/RoleResponses';
import { GET_ALL_ROLES } from 'src/messages/response';
import { RoleDto } from 'src/model/role/RoleDto';
import { UpdateRoleDto } from 'src/model/role/UpdateRoleDto';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(ROLE_GET_ALL)
  async getAllRoles(): RoleSearchAllResponse {
    const roles = await this.roleService.getRoles();
    if (!roles)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_ALL_ROLES.BAD_REQUEST,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      message: GET_ALL_ROLES.SUCCESS,
      data: { roles },
    };
  }

  @MessagePattern(ROLE_GET)
  async getRole(@Payload() roleDto: RoleDto): RoleResponse {
    const role = await this.roleService.getRole(roleDto);

    if (!role)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_ROLE.BAD_REQUEST,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      message: GET_ROLE.SUCCESS,
      data: { role },
    };
  }

  @MessagePattern(ROLE_CREATE)
  async createRole(@Payload() roleDto: RoleDto): RoleResponse {
    const createdRole = await this.roleService.createRole(roleDto);

    if (!createdRole)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE_ROLE.BAD_REQUEST,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      message: CREATE_ROLE.SUCCESS,
      data: { role: createdRole },
    };
  }

  @MessagePattern(ROLE_UPDATE)
  async updateRole(@Payload() data: UpdateRoleDto): RoleUpdatedResponse {
    try {
      await this.roleService.updateRole(data);

      const updatedRole = await this.roleService.getRoleById({ id: data.id });

      return {
        status: HttpStatus.OK,
        message: UPDATE_ROLE.SUCCESS,
        data: { updated: true, role: updatedRole },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: UPDATE_ROLE.BAD_REQUEST,
        data: { updated: false },
      };
    }
  }

  @MessagePattern(ROLE_DELETE)
  async deleteRole(@Payload() data: DeleteRoleDto): RoleDeletedResponse {
    try {
      await this.roleService.deleteRole(data);

      return {
        status: HttpStatus.OK,
        message: DELETE_ROLE.SUCCESS,
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: DELETE_ROLE.BAD_REQUEST,
        data: { deleted: false },
      };
    }
  }
}
