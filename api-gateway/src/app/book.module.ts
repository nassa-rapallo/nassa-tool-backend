import { ConfigService } from 'src/services/config/config.service';
import { Module } from '@nestjs/common';
import { BookProvider } from 'src/providers/book.provider';

@Module({
  imports: [],
  providers: [ConfigService, BookProvider],
  exports: [BookProvider],
})
export class BookModule {}
