import {
  RULE_CREATE,
  RULE_DELETE,
  RULE_GET_BY_ID,
  RULE_UPDATE,
} from './../model/rule/messages/commands';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { RuleService } from 'src/services/rule.service';
import { RULE_RESPONSE } from 'src/model/rule/messages/response';
import { CreateRuleDto, UpdateRuleDto } from 'src/model/rule/dto';
import { AllRulesResponse, RuleResponse } from 'src/model/rule/responses';

@Controller()
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @MessagePattern(RULE_CREATE)
  async ruleCreate(@Payload() createRuleDto: CreateRuleDto): RuleResponse {
    try {
      const rule = await this.ruleService.createRule(createRuleDto);

      return {
        status: HttpStatus.CREATED,
        message: RULE_RESPONSE.CREATE.CREATED,
        data: { rule },
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: RULE_RESPONSE.CREATE.BAD_REQUEST,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  async ruleGetAll(): AllRulesResponse {
    try {
      const rules = await this.ruleService.getAll();

      if (!rules)
        return {
          status: HttpStatus.NOT_FOUND,
          message: RULE_RESPONSE.GET_ALL.NOT_FOUND,
          data: null,
        };

      return {
        status: HttpStatus.FOUND,
        message: RULE_RESPONSE.GET_ALL.FOUND,
        data: { rules },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RULE_RESPONSE.GET_ALL.SERVER_ERROR,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(RULE_GET_BY_ID)
  async ruleGetById(@Payload() data: { id: string }): Promise<RuleResponse> {
    try {
      const rule = await this.ruleService.getRuleById({ id: data.id });

      return {
        status: HttpStatus.FOUND,
        message: RULE_RESPONSE.GET_BY_ID.FOUND,
        data: { rule },
      };
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: RULE_RESPONSE.GET_BY_ID.NOT_FOUND,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(RULE_UPDATE)
  async ruleUpdate(
    @Payload() updateRuleDto: UpdateRuleDto,
  ): Promise<RuleResponse> {
    try {
      const updated = await this.ruleService.updateRule(updateRuleDto);
      return {
        status: HttpStatus.OK,
        message: RULE_RESPONSE.UPDATE.UPDATED,
        data: { rule: updated },
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RULE_RESPONSE.UPDATE.SERVER_ERROR,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(RULE_DELETE)
  async ruleDelete(@Payload() data: { id: string }): Promise<RuleResponse> {
    try {
      await this.ruleService.deleteRule(data);

      return {
        status: HttpStatus.OK,
        message: RULE_RESPONSE.DELETE.DELETED,
        data: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: RULE_RESPONSE.DELETE.SERVER_ERROR,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }
}
