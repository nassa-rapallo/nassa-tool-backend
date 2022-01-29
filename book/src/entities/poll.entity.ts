import { PollStatus } from 'src/shared/constants';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  month: string;

  @Column({ type: 'enum', enum: PollStatus, default: PollStatus.Open })
  status: PollStatus;

  @Column({ default: [] })
  userIds: string[];
}
