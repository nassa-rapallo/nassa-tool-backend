import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// config
import { ConfigService } from './services/config/config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';

// book
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';
// poll
import { Poll } from './entities/poll.entity';
import { PollController } from './controllers/poll.controller';
import { PollService } from './services/poll.service';
// bookPoll
import { BookPollController } from './controllers/book-poll.controller';
import { BookPoll } from './entities/book-poll.entity';
import { BookPollService } from './services/book-poll.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Book, Poll, BookPoll]),
  ],
  controllers: [BookController, PollController, BookPollController],
  providers: [ConfigService, BookService, PollService, BookPollService],
})
export class BookModule {}
