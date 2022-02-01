import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { TypeOrmConfigService } from './services/config/typeorm-config.service';


@Module({

  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [],
  providers: [],
})
export class GroupModule {}
