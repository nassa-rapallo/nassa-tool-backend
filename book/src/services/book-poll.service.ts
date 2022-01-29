import { BookPoll } from './../entities/book-poll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import * as Dto from 'src/model/book-poll/dto';

@Injectable()
export class BookPollService {
  constructor(
    @InjectRepository(BookPoll)
    private readonly repository: Repository<BookPoll>,
  ) {}

  async booksForPoll(data: Dto.BooksForPoll): Promise<BookPoll[]> {
    return this.repository.find({ where: { pollId: data.pollId } });
  }

  async bookPollGet(data: Dto.BookPollGet): Promise<BookPoll> {
    return this.repository.findOneOrFail({
      bookId: data.bookId,
      pollId: data.pollId,
    });
  }

  async bookPollAdd(data: Dto.BookPollAdd): Promise<BookPoll> {
    return this.repository.save(data);
  }

  async bookPollRemove(data: Dto.BookPollRemove): Promise<void> {
    await this.repository.delete({
      bookId: data.bookId,
      pollId: data.pollId,
    });
  }

  async bookPollVote(data: Dto.BookPollVote): Promise<void> {
    const bookPoll = await this.repository.findOneOrFail({
      pollId: data.pollId,
      bookId: data.bookId,
    });

    await this.repository.update(
      { pollId: data.pollId, bookId: data.bookId },
      { votes: bookPoll.votes + 1 },
    );
  }
}
