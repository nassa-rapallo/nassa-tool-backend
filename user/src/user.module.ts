import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppService } from './app.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AppService, ConfigService],
})
export class UserModule {}
