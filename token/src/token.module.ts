import { UserTokenController } from './controllers/user-token.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './entities/user-token.entity';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { UserTokenService } from './services/user-token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './services/config/jwt-config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    TypeOrmModule.forFeature([UserToken]),
  ],
  controllers: [UserTokenController],
  providers: [UserTokenService],
})
export class TokenModule {}
