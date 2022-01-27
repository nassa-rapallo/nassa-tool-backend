import { BookCreate } from './../model/book/dto/BookCreate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Book } from 'src/entities/book.entity';
import { BookGet, BookUpdate } from 'src/model/book/dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async bookGetAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async bookGet(data: BookGet): Promise<Book> {
    return this.bookRepository.findOneOrFail({ id: data.id });
  }

  async bookCreate(data: BookCreate): Promise<Book> {
    return this.bookRepository.save(data);
  }

  async bookUpdate(data: BookUpdate): Promise<void> {
    await this.bookRepository.update({ id: data.id }, data.bookData);
  }

  async bookDelete(data: BookGet): Promise<void> {
    await this.bookRepository.delete({ id: data.id });
  }
}
