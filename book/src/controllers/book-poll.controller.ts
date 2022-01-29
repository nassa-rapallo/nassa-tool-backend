import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { BookPollService } from 'src/services/book-poll.service';

import * as Dto from 'src/model/book-poll/dto';
import * as C from 'src/model/book-poll/command';
import * as R from 'src/model/book-poll/responses';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BookPollController {
  constructor(@Inject() private readonly bookPollService: BookPollService) {}

  @MessagePattern(C.BOOKS_FOR_POLL)
  async booksForPoll(data: Dto.BooksForPoll): R.BooksForPollResponse {
    const books = await this.bookPollService.booksForPoll(data);

    if (!books)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'error',
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: 'success',
      data: { books },
    };
  }

  @MessagePattern(C.BOOKPOLL_GET)
  async bookPollGet(data: Dto.BookPollGet): R.BookPollGotResponse {
    try {
      const book = await this.bookPollService.bookPollGet(data);
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

  @MessagePattern(C.BOOKPOLL_ADD)
  async bookPollAdd(data: Dto.BookPollAdd): R.BookPollAddedResponse {
    const book = await this.bookPollService.bookPollAdd(data);

    if (!book)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'error',
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: 'success',
      data: { bookPoll: book },
    };
  }

  @MessagePattern(C.BOOKPOLL_REMOVE)
  async bookPollRemove(data: Dto.BookPollRemove): R.BookPollRemovedResponse {
    try {
      await this.bookPollService.bookPollRemove(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { removed: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { removed: false },
      };
    }
  }

  @MessagePattern(C.BOOKPOLL_VOTE)
  async bookPollVote(data: Dto.BookPollVote): R.BookPollVotedResponse {
    try {
      await this.bookPollService.bookPollVote(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { voted: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { voted: false },
      };
    }
  }
}
