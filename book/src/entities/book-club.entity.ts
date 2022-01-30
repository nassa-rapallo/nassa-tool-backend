import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookClub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  membersId: string[];

  @Column({ nullable: true })
  currentPollId: string;

  @Column({ nullable: true })
  currentBookId: string;
}
