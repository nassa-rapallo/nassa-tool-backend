import { Section } from 'src/entities/section.entity';
import { Response } from 'src/model/Response';

export type SectionResponse = Promise<Response<{ section: Section }>>;
export type AllSectionsResponse = Promise<Response<{ sections: Section[] }>>;
