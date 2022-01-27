import { BookGet } from './BookGet';
import { Book } from 'src/entities/book.entity';

export class BookUpdate extends BookGet {
  bookData: Partial<Omit<Book, 'id'>>;
}
