import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/services/guards/authorization.guard';
import { ValidationGuard } from 'src/services/guards/validation.guard';
import { PermissionModule } from './permission.module';
import { TokenModule } from './token.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TokenModule, PermissionModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ValidationGuard,
    },
  ],
})
export class GuardsModule {}
