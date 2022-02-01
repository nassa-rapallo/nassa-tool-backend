import { Module } from '@nestjs/common';
import { TokenProvider } from 'src/providers/token.provider';
import { AuthController } from 'src/routes/user/auth.controller';
import { TokenService } from 'src/services/clients/token/token.service';
import { ConfigService } from 'src/services/config/config.service';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [ConfigService, TokenProvider, TokenService],
  exports: [TokenProvider, TokenService],
})
export class TokenModule {}
