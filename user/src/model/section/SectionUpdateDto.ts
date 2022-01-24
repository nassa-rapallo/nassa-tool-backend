import { Section } from 'src/entities/section.entity';

export class SectionUpdateDto {
  id: string;
  sectionData: Partial<Section>;
}
