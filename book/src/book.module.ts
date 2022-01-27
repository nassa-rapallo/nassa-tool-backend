import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// config
import { ConfigService } from './services/config/config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';

// book
import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BookController],
  providers: [ConfigService],
})
export class BookModule {}
