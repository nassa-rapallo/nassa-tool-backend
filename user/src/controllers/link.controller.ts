import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';
import { hash } from 'argon2';

import * as Dto from 'src/model/link/dto';
import * as C from 'src/model/link/command';
import * as Response from 'src/model/link/responses';
import { message } from 'src/shared/message';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(C.CONFIRM_LINK)
  async confirmUser(data: Dto.ChangePassword): Response.ConfirmUser {
    try {
      const userLink = await this.linkService.getLink({ link: data.link });
      await this.linkService.useLink({ link: userLink.link });
      await this.userService.confirm({ id: userLink.user_id });

      return {
        status: HttpStatus.OK,
        message: message(C.CONFIRM_LINK, HttpStatus.OK),
        data: { confirmed: true },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.CONFIRM_LINK, HttpStatus.OK),
        data: { confirmed: false },
      };
    }
  }

  @MessagePattern(C.CHANGE_PASSWORD)
  public async changePassword(
    data: Dto.ChangePassword,
  ): Response.ChangePassword {
    try {
      const user = await this.userService.get({ id: data.id });

      if (!user.changing_password)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'not_changing_password',
          data: { changed: true },
        };

      const newPassword = await hash(data.newPassword);

      await this.userService.update({
        id: user.id,
        userData: { changing_password: false, password: newPassword },
      });

      await this.linkService.useLink({ link: data.link });
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { changed: false },
      };
    }
  }
}
