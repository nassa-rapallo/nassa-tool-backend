import { Section } from './section.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Action } from './action.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Section, (section) => section.permission, { nullable: true })
  sections: Section[];

  @OneToMany(() => Action, (action) => action.permission, { nullable: true })
  actions: Action[];
}
