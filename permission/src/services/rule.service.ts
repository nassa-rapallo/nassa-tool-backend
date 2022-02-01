import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Rule } from 'src/entities/rule.entity';
import { Repository } from 'typeorm';

import * as Dto from 'src/model/rule/dto';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private readonly repository: Repository<Rule>,
  ) {}

  async createRule(data: Dto.Create): Promise<Rule> {
    return this.repository.save(data);
  }

  async getAll(): Promise<Rule[]> {
    return this.repository.find({ relations: ['permission'] });
  }

  async getRuleById(data: Dto.Get): Promise<Rule> {
    return this.repository.findOneOrFail(
      {
        id: data.id,
      },
      { relations: ['permission'] },
    );
  }

  async deleteRule(data: Dto.Delete): Promise<void> {
    await this.repository.delete({ id: data.id });
  }

  async updateRule(data: Dto.Update): Promise<void> {
    await this.repository.update({ id: data.id }, { ...data.ruleData });
  }
}
