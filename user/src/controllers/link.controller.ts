import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { USER_CHANGE_PASSWORD, USER_CONFIRM_LINK } from 'src/messages/command';
import { CONFIRM_LINK } from 'src/messages/response';
import { Response } from 'src/responses/Response';
import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';
import { hash } from 'argon2';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(USER_CONFIRM_LINK)
  async confirmUser(data: { link: string }): Promise<Response<boolean>> {
    try {
      const userLink = await this.linkService.getLink({ link: data.link });
      await this.linkService.useLink({ link: userLink.link });
      await this.userService.confirmUser({ id: userLink.user_id });

      return {
        status: HttpStatus.OK,
        message: CONFIRM_LINK.SUCCESS,
        data: true,
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CONFIRM_LINK.BAD_REQUEST,
        data: false,
      };
    }
  }

  @MessagePattern(USER_CHANGE_PASSWORD)
  public async changePassword(data: {
    userId: string;
    newPassword: string;
    link: string;
  }): Promise<Response<boolean>> {
    try {
      const user = await this.userService.searchById({ id: data.userId });

      if (!user.changing_password)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'not_changing_password',
          data: false,
        };

      const newPassword = await hash(data.newPassword);

      await this.userService.updateUser({
        userId: user.id,
        userData: { changing_password: false, password: newPassword },
      });

      await this.linkService.useLink({ link: data.link });
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: false,
      };
    }
  }
}
