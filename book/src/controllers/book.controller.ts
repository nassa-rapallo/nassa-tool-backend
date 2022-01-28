import {
  BookDeletedResponse,
  BookGetResponse,
} from './../model/book/responses';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './../services/book.service';
import { Controller, HttpStatus } from '@nestjs/common';
import { BOOK_GET_ALL } from 'src/model/book/command';
import {
  BookGetAllResponse,
  BookCreateResponse,
  BookUpdatedResponse,
} from 'src/model/book/responses';
import { BookCreate, BookGet, BookUpdate } from 'src/model/book/dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('hello_book')
  async bookHello(): Promise<string> {
    return 'Hello from Book!';
  }

  @MessagePattern(BOOK_GET_ALL)
  async bookGetAll(): BookGetAllResponse {
    try {
      const books = await this.bookService.bookGetAll();

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { books },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  async bookGet(data: BookGet): BookGetResponse {
    try {
      const book = await this.bookService.bookGet(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { book },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  async bookCreate(data: BookCreate): BookCreateResponse {
    try {
      const book = await this.bookService.bookCreate(data);

      if (!book)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'bad_request',
          data: undefined,
        };

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { book },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  async bookUpdate(data: BookUpdate): BookUpdatedResponse {
    try {
      await this.bookService.bookUpdate(data);
      const updatedBook = await this.bookService.bookGet({ id: data.id });

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { updated: true, book: updatedBook },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { updated: true },
      };
    }
  }

  async bookDelete(data: BookGet): BookDeletedResponse {
    try {
      await this.bookService.bookDelete(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { deleted: false },
      };
    }
  }
}
