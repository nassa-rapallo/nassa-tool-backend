import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookClub } from 'src/entities/book-club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookClubService {
  constructor(
    @InjectRepository(BookClub)
    private readonly repository: Repository<BookClub>,
  ) {}

  async getBookClub(): Promise<BookClub> {
    const bookClub = await this.repository.find();
    return bookClub[0];
  }

  async addMember(data: { memberId: string }): Promise<void> {
    const bookClub = await this.repository.find();

    await this.repository.update(
      { id: bookClub[0].id },
      { membersId: [...bookClub[0].membersId, data.memberId] },
    );
  }

  async addCurrentPoll(data: { pollId: string }): Promise<void> {
    const bookClub = await this.repository.find();

    await this.repository.update(
      { id: bookClub[0].id },
      { currentPollId: data.pollId },
    );
  }

  async addCurrentBook(data: { bookId: string }): Promise<void> {
    const bookClub = await this.repository.find();

    await this.repository.update(
      { id: bookClub[0].id },
      { currentBookId: data.bookId },
    );
  }

  async removeCurrentPoll(): Promise<void> {
    const bookClub = await this.repository.find();

    await this.repository.update(
      { id: bookClub[0].id },
      { currentPollId: null },
    );
  }
}
