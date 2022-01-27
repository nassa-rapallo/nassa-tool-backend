import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class BookModule {}
