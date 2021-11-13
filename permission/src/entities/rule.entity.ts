import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
@Unique('rule_uniques_section_action', ['section', 'action'])
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Section, (section) => section.rules)
  section: Section;

  @Column()
  action: string;

  @Column('text', { array: true })
  roles: string[];
}
