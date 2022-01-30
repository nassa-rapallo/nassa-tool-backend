import { BookClub } from 'src/entities/book-club.entity';
import { Book } from 'src/entities/book.entity';
import { Poll } from 'src/entities/poll.entity';
import { Response } from 'src/shared/Response';
import { VotingBook } from '../VotingBook';

export type BookClubGetResponse = Promise<Response<{ bookClub: BookClub }>>;

export type BookClubCreatePollResponse = Promise<
  Response<{ poll: Poll; books: VotingBook[] }>
>;

export type BookClubClosePollResponse = Promise<Response<{ winner: Book }>>;

export type BookClubMemberAddedResponse = Promise<Response<{ added: boolean }>>;
