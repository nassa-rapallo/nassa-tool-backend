import { BookPoll } from 'src/entities/book-poll.entity';
import { Response } from 'src/shared/Response';

export type BooksForPollResponse = Promise<Response<{ books: BookPoll[] }>>;
export type BookPollGotResponse = Promise<Response<{ book: BookPoll }>>;
export type BookPollAddedResponse = Promise<Response<{ bookPoll: BookPoll }>>;
export type BookPollRemovedResponse = Promise<Response<{ removed: boolean }>>;
export type BookPollVotedResponse = Promise<Response<{ voted: boolean }>>;
