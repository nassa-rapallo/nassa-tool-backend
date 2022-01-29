import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';

import { BookService } from './../services/book.service';
import * as Dto from 'src/model/book/dto';
import * as C from 'src/model/book/command';
import * as R from 'src/model/book/responses';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern('hello_book')
  async bookHello(): Promise<string> {
    return 'Hello from Book!';
  }

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(C.BOOK_GET_ALL)
  async bookGetAll(): R.BookGetAllResponse {
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

  @MessagePattern(C.BOOK_GET)
  async bookGet(data: Dto.BookGet): R.BookGetResponse {
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

  @MessagePattern(C.BOOK_CREATE)
  async bookCreate(data: Dto.BookCreate): R.BookCreateResponse {
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

  @MessagePattern(C.BOOK_UPDATE)
  async bookUpdate(data: Dto.BookUpdate): R.BookUpdatedResponse {
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

  @MessagePattern(C.BOOK_DELETE)
  async bookDelete(data: Dto.BookGet): R.BookDeletedResponse {
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
