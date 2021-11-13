import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Rule } from 'src/entities/rule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {}
}
