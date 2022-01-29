import { Categories } from 'src/shared/constants';

export class BookCreate {
  // mandatory
  title: string;
  pageCount: number;
  userId: string;
  // optional
  description?: string;
  category: Categories;
}
