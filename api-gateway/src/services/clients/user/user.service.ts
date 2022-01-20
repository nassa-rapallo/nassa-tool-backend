import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from '../clientsName';
import { Inject, Injectable } from '@nestjs/common';
import * as COMMANDS from './commands';
import * as Responses from 'src/modules/user/response';
import * as Dto from 'src/modules/user/dto';
import * as Params from 'src/modules/user/param';

@Injectable()
export class UserService {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async userGetAll(): Promise<Responses.UserGetAll> {
    return firstValueFrom(this.userClient.send<Responses.UserGetAll>(COMMANDS.USER_GET_ALL, {}));
  }

  async userGet(params: Params.UserGet): Promise<Responses.UserGet> {
    return firstValueFrom(
      this.userClient.send<Responses.UserGet, Dto.UserIdDto>(COMMANDS.USER_GET, params),
    );
  }

  async userCreate(data: Dto.CreateUserDto): Promise<Responses.UserLink> {
    return firstValueFrom(
      this.userClient.send<Responses.UserLink, Dto.CreateUserDto>(COMMANDS.USER_CREATE, data),
    );
  }

  async userDelete(data: Dto.DeleteUserDto): Promise<Responses.UserDelete> {
    return firstValueFrom(
      this.userClient.send<Responses.UserDelete, Dto.DeleteUserDto>(COMMANDS.USER_DELETE, data),
    );
  }

  async userUpdate(data: Dto.UpdateUserDto): Promise<Responses.UserUpdate> {
    return firstValueFrom(
      this.userClient.send<Responses.UserUpdate, Dto.UpdateUserDto>(COMMANDS.USER_UPDATE, data),
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async userAddRole(data: Dto.AddRoleDto): Promise<Responses.User> {
    return firstValueFrom(
      this.userClient.send<Responses.User, Dto.AddRoleDto>(COMMANDS.USER_ADD_ROLE, data),
    );
  }

  async userConfirm(data: Dto.ConfirmUserDto): Promise<Responses.UserConfirm> {
    return firstValueFrom(
      this.userClient.send<Responses.UserConfirm, Dto.ConfirmUserDto>(
        COMMANDS.USER_CONFIRM_LINK,
        data,
      ),
    );
  }

  async userForgotPassword(data: Dto.ForgotPasswordDto): Promise<Responses.UserForgotPassword> {
    return firstValueFrom(
      this.userClient.send<Responses.UserForgotPassword, Dto.ForgotPasswordDto>(
        COMMANDS.USER_FORGOT_PASSWORD,
        data,
      ),
    );
  }

  async userChangePassword(data: Dto.ChangePasswordDto): Promise<Responses.UserChangePassword> {
    return firstValueFrom(
      this.userClient.send<Responses.UserChangePassword, Dto.ChangePasswordDto>(
        COMMANDS.USER_CHANGE_PASSWORD,
        data,
      ),
    );
  }
}
