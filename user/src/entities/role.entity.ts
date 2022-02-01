import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  groupId: string;

  @Column({ nullable: false })
  roleId: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
