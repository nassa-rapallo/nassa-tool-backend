import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserToken } from './entities/user-token.entity';
import { TypeOrmConfigService } from './services/typeorm-config.service';
import { UserTokenService } from './services/user-token.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    TypeOrmModule.forFeature([UserToken]),
  ],
  controllers: [AppController],
  providers: [UserTokenService],
})
export class TokenModule {}
