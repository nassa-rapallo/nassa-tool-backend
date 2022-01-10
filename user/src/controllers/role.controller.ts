import { GET_ROLE, CREATE_ROLE, UPDATE_ROLE } from './../messages/response';
import { ROLE_CREATE, ROLE_GET, ROLE_UPDATE } from './../messages/command';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { ROLE_GET_ALL } from 'src/messages/command';
import { RoleService } from 'src/services/role.service';
import {
  RoleSearchAllResponse,
  RoleResponse,
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
  async updateRole(@Payload() data: UpdateRoleDto): RoleResponse {
    const updated = await this.roleService.updateRole(data);

    if (!updated)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: UPDATE_ROLE.BAD_REQUEST,
        data: null,
      };

    return {
      status: HttpStatus.OK,
      message: UPDATE_ROLE.SUCCESS,
      data: { role: updated },
    };
  }
}
