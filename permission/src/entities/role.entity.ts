import { Section } from './section.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Action } from './action.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true, nullable: true })
  discord_role: string;

  @Column('text', { array: true })
  user_ids: string[];

  @ManyToMany(() => Section, (section) => section.admins, { nullable: true })
  admin_sections: Section[];

  @ManyToMany(() => Action, (action) => action.admins, { nullable: true })
  admin_actions: Action[];
}
