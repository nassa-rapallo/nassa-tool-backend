import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rule } from './rule.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(() => Rule, (rule) => rule.section)
  rules: Rule[];
}
