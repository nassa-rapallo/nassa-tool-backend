import { Section } from 'src/entities/section.entity';
import { Response } from 'src/model/Response';

export type SectionResponse = Response<{ section: Section }>;
