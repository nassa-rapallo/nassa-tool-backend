import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/permission/dto';
import * as Responses from 'src/modules/permission/response';

@Injectable()
export class PermissionService {
  constructor(@Inject(PERMISSION_SERVICE) private readonly permissionClient: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async permissionCreate(data: Dto.CreatePermissionDto): Promise<Responses.PermissionCreated> {
    return firstValueFrom(
      this.permissionClient.send<Responses.PermissionCreated, Dto.CreatePermissionDto>(
        COMMANDS.PERMISSION_CREATE,
        data,
      ),
    );
  }

  async permissionGet(data: Dto.GetPermissionDto): Promise<Responses.PermissionGet> {
    return firstValueFrom(
      this.permissionClient.send<Responses.PermissionGet, Dto.GetPermissionDto>(
        COMMANDS.PERMISSION_GET,
        data,
      ),
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async permissionIsPermitted(
    data: Dto.PermissionIsPermittedDto,
  ): Promise<Responses.PermissionIsPermitted> {
    return firstValueFrom(
      this.permissionClient.send<Responses.PermissionIsPermitted, Dto.PermissionIsPermittedDto>(
        COMMANDS.PERMISSION_IS_PERMITTED,
        data,
      ),
    );
  }
}
