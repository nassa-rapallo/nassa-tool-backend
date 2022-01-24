import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Rule } from 'src/entities/rule.entity';
import { Repository } from 'typeorm';
import { CreateRuleDto } from 'src/model/rule/dto/CreateRuleDto';
import { UpdateRuleDto } from 'src/model/rule/dto/UpdateRuleDto';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}

  async createRule(createRuleDto: CreateRuleDto): Promise<Rule> {
    return this.ruleRepository.save(createRuleDto);
  }

  async getAll(): Promise<Rule[]> {
    return this.ruleRepository.find();
  }

  async getRuleById(data: { id: string }): Promise<Rule> {
    return this.ruleRepository.findOneOrFail({ id: data.id });
  }

  async getRuleByAction(data: { action: string }): Promise<Rule> {
    return this.ruleRepository.findOneOrFail({
      where: { action: data.action },
    });
  }

  async deleteRule(data: { id: string }): Promise<void> {
    await this.ruleRepository.delete({ id: data.id });
  }

  async updateRule(updateRuleDto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.getRuleById({ id: updateRuleDto.ruleId });

    await this.ruleRepository.update(
      { id: updateRuleDto.ruleId },
      { roles: updateRuleDto.roles },
    );

    return { ...rule, roles: updateRuleDto.roles };
  }
}
