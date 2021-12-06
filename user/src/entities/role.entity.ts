import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

export enum SECTIONS {
  ALL = 'all',
  BOOKS = 'books',
}

@Entity()
@Unique('role_uniques_section_name', ['section', 'name'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SECTIONS,
    default: SECTIONS.ALL,
  })
  section: SECTIONS;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  discord_role: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
