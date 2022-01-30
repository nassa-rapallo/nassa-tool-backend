import { Controller, Inject, HttpStatus } from '@nestjs/common';
import { BookClubService } from 'src/services/book-club.service';
import { MessagePattern } from '@nestjs/microservices';

import * as BookClubDto from 'src/model/book-club/dto';
import * as C from 'src/model/book-club/command';
import * as R from 'src/model/book-club/responses';
import { BookService } from 'src/services/book.service';
import { PollService } from 'src/services/poll.service';
import { BookPollService } from 'src/services/book-poll.service';
import { VotingBook } from 'src/model/VotingBook';
import { BookPoll } from 'src/entities/book-poll.entity';

@Controller()
export class BookClubController {
  constructor(
    @Inject() private readonly bookClubService: BookClubService,
    @Inject() private readonly pollService: PollService,
    @Inject() private readonly bookPollService: BookPollService,
    @Inject() private readonly bookService: BookService,
  ) {}

  @MessagePattern(C.BOOKCLUB_GET)
  async bookClubGet(): R.BookClubGetResponse {
    const bookClub = await this.bookClubService.getBookClub();

    if (!bookClub)
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: 'success',
      data: { bookClub },
    };
  }

  @MessagePattern(C.BOOKCLUB_CREATE_POLL)
  async bookClubCreatePoll(
    data: BookClubDto.BookClubCreatePoll,
  ): R.BookClubCreatePollResponse {
    try {
      // create new poll
      const poll = await this.pollService.pollCreate({ month: data.month });
      await this.bookClubService.addCurrentPoll({ pollId: poll.id });

      // create new book-polls
      const books: VotingBook[] = [];
      for (const id of data.bookIds) {
        await this.bookPollService.bookPollAdd({
          pollId: poll.id,
          bookId: id,
        });

        const book = await this.bookService.bookGet({ id: id });

        books.push({ book, votes: 0 });
      }

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { poll: poll, books },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.BOOKCLUB_CLOSE_POLL)
  async bookClubClosePoll(
    data: BookClubDto.BookClubClosePoll,
  ): R.BookClubClosePollResponse {
    try {
      // close poll operations
      await this.pollService.pollClose({ id: data.pollId });
      await this.bookClubService.removeCurrentPoll();

      // get all the voting books
      const books = await this.bookPollService.booksForPoll({
        pollId: data.pollId,
      });

      // find book with max votes
      let maxBook: BookPoll = undefined;
      for (const book of books)
        if (!maxBook || maxBook.votes < book.votes) maxBook = book;

      // set the winner book to read
      await this.bookService.bookUpdate({
        id: maxBook.bookId,
        bookData: { alreadyRead: true },
      });

      // set the current reading book to the winner one
      await this.pollService.pollUpdate({
        id: data.pollId,
        pollData: { winnerId: maxBook.bookId },
      });

      await this.bookClubService.addCurrentBook({ bookId: maxBook.bookId });
      const winnerBook = await this.bookService.bookGet({ id: maxBook.bookId });

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { winner: winnerBook },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.BOOKCLUB_ADD_MEMBER)
  async bookClubAddMember(
    data: BookClubDto.BookClubAddMember,
  ): R.BookClubMemberAddedResponse {
    try {
      await this.bookClubService.addMember({ memberId: data.memberId });
      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { added: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { added: false },
      };
    }
  }
}
