import { Response } from 'src/model/Response';
import { Section } from 'src/entities/section.entity';

export type AllSectionsResponse = Response<{ sections: Section[] }>;
