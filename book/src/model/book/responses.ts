import { Book } from 'src/entities/book.entity';
import { Response } from 'src/shared/Response';

export type BookGetAllResponse = Promise<Response<{ books: Book[] }>>;
export type BookGetResponse = Promise<Response<{ book: Book }>>;
export type BookCreateResponse = Promise<Response<{ book: Book }>>;
export type BookUpdatedResponse = Promise<
  Response<{ updated: boolean; book?: Book }>
>;
export type BookDeletedResponse = Promise<Response<{ deleted: boolean }>>;
