import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// config
import { ConfigService } from './services/config/config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';

// book
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';
import { Poll } from './entities/poll.entity';
import { PollController } from './controllers/poll.controller';
import { PollService } from './services/poll.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Book, Poll]),
  ],
  controllers: [BookController, PollController],
  providers: [ConfigService, BookService, PollService],
})
export class BookModule {}
