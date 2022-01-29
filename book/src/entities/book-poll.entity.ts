import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique('book_and_poll_unique', ['bookId', 'pollId'])
export class BookPoll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  bookId: string;

  @Column({ nullable: false })
  pollId: string;

  @Column('int', { default: 0 })
  votes: number;
}
