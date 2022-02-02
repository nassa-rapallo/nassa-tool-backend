import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from '../clientsName';
import { Inject, Injectable } from '@nestjs/common';
import * as COMMANDS from './commands';
import * as Responses from 'src/modules/user/response';
import * as Dto from 'src/modules/user/dto';
import * as Params from 'src/modules/user/param';
import { LoginUserDto } from 'src/modules/auth/dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async userGetAll(): Promise<Responses.GetAll> {
    return firstValueFrom(this.userClient.send<Responses.GetAll>(COMMANDS.USER_GET_ALL, {}));
  }

  async userGet(params: Params.UserGet): Promise<Responses.Get> {
    return firstValueFrom(
      this.userClient.send<Responses.Get, Params.UserGet>(COMMANDS.USER_GET, params),
    );
  }

  async userCreate(data: Dto.Create): Promise<Responses.UserLink> {
    return firstValueFrom(
      this.userClient.send<Responses.UserLink, Dto.Create>(COMMANDS.USER_CREATE, data),
    );
  }

  async userDelete(data: Dto.Delete): Promise<Responses.Deleted> {
    return firstValueFrom(
      this.userClient.send<Responses.Deleted, Dto.Delete>(COMMANDS.USER_DELETE, data),
    );
  }

  async userUpdate(data: Dto.Update): Promise<Responses.Updated> {
    return firstValueFrom(
      this.userClient.send<Responses.Updated, Dto.Update>(COMMANDS.USER_UPDATE, data),
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async userGetByCredentials(data: LoginUserDto): Promise<Responses.Get> {
    return firstValueFrom(
      this.userClient.send<Responses.Get, LoginUserDto>(COMMANDS.USER_SEARCH_BY_CREDENTIALS, data),
    );
  }

  async userAddRole(data: Dto.AddRole): Promise<Responses.Get> {
    return firstValueFrom(
      this.userClient.send<Responses.Get, Dto.AddRole>(COMMANDS.USER_ADD_ROLE, data),
    );
  }

  async userConfirm(data: Dto.Confirm): Promise<Responses.Confirm> {
    return firstValueFrom(
      this.userClient.send<Responses.Confirm, Dto.Confirm>(COMMANDS.USER_CONFIRM_LINK, data),
    );
  }

  async userForgotPassword(data: Dto.ForgotPassword): Promise<Responses.ForgotPassword> {
    return firstValueFrom(
      this.userClient.send<Responses.ForgotPassword, Dto.ForgotPassword>(
        COMMANDS.USER_FORGOT_PASSWORD,
        data,
      ),
    );
  }

  async userChangePassword(data: Dto.ChangePassword): Promise<Responses.ChangePassword> {
    return firstValueFrom(
      this.userClient.send<Responses.ChangePassword, Dto.ChangePassword>(
        COMMANDS.USER_CHANGE_PASSWORD,
        data,
      ),
    );
  }

  async userIsAdmin(data: { id: string }): Promise<Responses.IsAdmin> {
    return firstValueFrom(
      this.userClient.send<Responses.IsAdmin, { id: string }>(COMMANDS.USER_IS_ADMIN, data),
    );
  }
}
