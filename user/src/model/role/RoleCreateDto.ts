import { Section } from 'src/entities/section.entity';

export class RoleCreateDto {
  name: string;
  isAdmin?: boolean;
  discordRole?: string;
  section: Section;
}
