import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { RuleService } from 'src/services/rule.service';

import * as C from 'src/model/rule/command';
import * as Dto from 'src/model/rule/dto';
import { message } from 'src/shared/message';

@Controller()
export class RuleController {
  constructor(private readonly service: RuleService) {}

  @MessagePattern(C.CREATE)
  async ruleCreate(@Payload() data: Dto.Create) {
    try {
      const rule = await this.service.createRule(data);

      return {
        status: HttpStatus.OK,
        message: message(C.CREATE, HttpStatus.OK),
        data: { rule },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.CREATE, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.GET_ALL)
  async ruleGetAll() {
    try {
      const rules = await this.service.getAll();

      if (!rules)
        return {
          status: HttpStatus.NOT_FOUND,
          message: message(C.GET_ALL, HttpStatus.BAD_REQUEST),
          data: undefined,
        };

      return {
        status: HttpStatus.OK,
        message: message(C.GET_ALL, HttpStatus.OK),
        data: { rules },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.GET_ALL, HttpStatus.INTERNAL_SERVER_ERROR),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.GET)
  async ruleGetById(@Payload() data: Dto.Get) {
    try {
      const rule = await this.service.getRuleById({ id: data.id });

      return {
        status: HttpStatus.OK,
        message: message(C.GET, HttpStatus.OK),
        data: { rule },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: message(C.GET, HttpStatus.BAD_REQUEST),
        data: undefined,
      };
    }
  }

  @MessagePattern(C.UPDATE)
  async ruleUpdate(@Payload() data: Dto.Update) {
    try {
      await this.service.updateRule(data);
      return {
        status: HttpStatus.OK,
        message: message(C.UPDATE, HttpStatus.OK),
        data: { updated: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.UPDATE, HttpStatus.INTERNAL_SERVER_ERROR),
        data: { updated: false },
      };
    }
  }

  @MessagePattern(C.DELETE)
  async ruleDelete(@Payload() data: Dto.Delete) {
    try {
      await this.service.deleteRule(data);

      return {
        status: HttpStatus.OK,
        message: message(C.DELETE, HttpStatus.OK),
        data: { deleted: true },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message(C.DELETE, HttpStatus.INTERNAL_SERVER_ERROR),
        data: { delete: false },
      };
    }
  }
}
