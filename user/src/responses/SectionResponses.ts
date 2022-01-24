import { Section } from 'src/entities/section.entity';
import { Response } from './Response';

export type SectionSearchAllResponse = Promise<
  Response<{ sections: Section[] }>
>;

export type SectionResponse = Promise<Response<{ section: Section }>>;
export type SectionUpdateResponse = Promise<
  Response<{ updated: boolean; section?: Section }>
>;
export type SectionDeleteResponse = Promise<Response<{ deleted: boolean }>>;
