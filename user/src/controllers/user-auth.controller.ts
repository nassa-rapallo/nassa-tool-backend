import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TYPES } from 'src/entities/link.entity';

import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';

import * as C from 'src/model/userAuth/command';
import * as Dto from 'src/model/userAuth/dto';
import * as Response from 'src/model/userAuth/responses';
import { message } from 'src/shared/message';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern(C.FORGOT_PASSWORD)
  public async forgotPassword(
    @Payload() data: Dto.ForgotPassword,
  ): Response.ForgotPassword {
    try {
      const user = await this.userService.get({ id: data.userId });

      const passwordLink = await this.linkService.create({
        user_id: user.id,
        type: TYPES.PASSWORD,
      });

      return {
        status: HttpStatus.OK,
        message: message(C.FORGOT_PASSWORD, HttpStatus.OK),
        data: {
          email: user.email,
          link: await this.linkService.getWebLink({ link: passwordLink.link }),
        },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.FORGOT_PASSWORD, HttpStatus.INTERNAL_SERVER_ERROR),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.IS_ADMIN)
  public async isAdmin(@Payload() data: { id: string }): Response.IsAdmin {
    try {
      const user = await this.userService.get({ id: data.id });

      return {
        status: user.isAdmin ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
        message: message(
          C.IS_ADMIN,
          user.isAdmin ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
        ),
        data: { admin: user.isAdmin },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.IS_ADMIN, HttpStatus.INTERNAL_SERVER_ERROR),
        data: undefined,
      };
    }
  }
}
