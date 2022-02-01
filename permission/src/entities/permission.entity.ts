import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rule } from './rule.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  section: string;

  @Column({ unique: true, nullable: false })
  actionId: string;

  @Column({ nullable: false })
  actionName: string;

  @Column('text', { nullable: true })
  decription: string;

  @OneToMany(() => Rule, (rule) => rule.permission)
  rules: Rule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
