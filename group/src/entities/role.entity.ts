import Types from '../shared/Types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'enum', enum: Types, default: Types.NONE })
  type: Types;

  @Column('int', { default: 0 })
  position: number;

  @ManyToOne(() => Group, (group) => group.roles)
  group: Group;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
