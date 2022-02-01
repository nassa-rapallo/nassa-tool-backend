import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  groupId: string;

  @Column('simple-array', { default: [] })
  cluster: string[];

  @ManyToOne(() => Permission, (permission) => permission.rules)
  permission: Permission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
