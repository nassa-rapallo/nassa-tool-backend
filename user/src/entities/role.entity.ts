import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Section } from './section.entity';
import { User } from './user.entity';

@Entity()
@Unique('role_uniques_section_name', ['section', 'name'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Section, (section) => section.roles)
  section: Section;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  discordRole: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
