import { PollStatus } from 'src/shared/constants';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  month: string;

  @Column({ type: 'enum', enum: PollStatus, default: PollStatus.Open })
  status: PollStatus;

  @Column({ nullable: true })
  winnerId: string;

  @Column({ default: [] })
  userIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
