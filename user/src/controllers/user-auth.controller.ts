import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_FORGOT_PASSWORD, USER_IS_ADMIN } from 'src/messages/command';
import { FORGOT_PASSWORD, IS_ADMIN } from 'src/messages/response';
import { LinkService } from 'src/services/link.service';
import { UserService } from 'src/services/user.service';
import { RoleService } from 'src/services/role.service';
import { IsAdminDto } from 'src/model/userAuth/IsAdminDto';
import { ForgotPasswordDto } from 'src/model/userAuth/ForgotPasswordDto';
import { TYPES } from 'src/entities/link.entity';
import {
  ForgotPasswordResponse,
  IsAdminResponse,
} from 'src/responses/UserAuthResponses';

@Controller()
export class LinkController {
  constructor(
    private readonly linkService: LinkService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @MessagePattern(USER_IS_ADMIN)
  public async isAdmin(@Payload() data: IsAdminDto): IsAdminResponse {
    try {
      const user = await this.userService.searchById({ id: data.userId });
      const isAdmin = await this.userService.isAdmin(user, data.section);

      if (!isAdmin)
        return {
          status: HttpStatus.FORBIDDEN,
          message: IS_ADMIN.UNAUTHORIZED,
          data: { admin: false },
        };

      return {
        status: HttpStatus.OK,
        message: IS_ADMIN.OK,
        data: { admin: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: IS_ADMIN.ERROR,
        data: undefined,
      };
    }
  }

  @MessagePattern(USER_FORGOT_PASSWORD)
  public async forgotPassword(data: ForgotPasswordDto): ForgotPasswordResponse {
    try {
      const user = await this.userService.searchById({ id: data.userId });

      const passwordLink = await this.linkService.createLink({
        user_id: user.id,
        type: TYPES.PASSWORD,
      });

      return {
        status: HttpStatus.OK,
        message: FORGOT_PASSWORD.OK,
        data: {
          email: user.email,
          link: await this.linkService.getWebLink({ link: passwordLink.link }),
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: FORGOT_PASSWORD.BAD_REQUEST,
        data: undefined,
      };
    }
  }
}
