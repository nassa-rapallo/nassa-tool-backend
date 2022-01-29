import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  month: string;

  @Column({ default: [] })
  userIds: string[];
}
