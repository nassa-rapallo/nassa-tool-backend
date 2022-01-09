import { Rule } from 'src/entities/rule.entity';
import { Section } from 'src/entities/section.entity';
import { Response } from 'src/model/Response';

export type CreatePermission = Response<{ action: Rule; section: Section }>;
