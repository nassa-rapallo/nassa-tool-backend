import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class Action {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Role, { nullable: true })
  @JoinTable()
  admins: Role[];

  @ManyToOne(() => Permission, (permission) => permission.actions)
  permission: Permission;
}
