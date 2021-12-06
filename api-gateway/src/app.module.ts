import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigService } from './services/config/config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './routes/user.controller';
import { AuthController } from './routes/auth.controller';
import { USER_SERVICE, TOKEN_SERVICE, PERMISSION_SERVICE } from './clients';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './services/guards/authorization.guard';
import { HelloController } from './routes/hello.controller';
import { RoleController } from './routes/role.controller';
import { ValidationGuard } from './services/guards/validation.guard';

@Module({
  imports: [],
  controllers: [
    HelloController,
    AppController,
    UserController,
    AuthController,
    RoleController,
  ],
  providers: [
    ConfigService,
    {
      provide: USER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const rabbit = configService.get('rabbit');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbit.host],
            queue: rabbit.queues.user,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },

    {
      provide: TOKEN_SERVICE,
      useFactory: (configService: ConfigService) => {
        const rabbit = configService.get('rabbit');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbit.host],
            queue: rabbit.queues.token,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: PERMISSION_SERVICE,
      useFactory: (configService: ConfigService) => {
        const rabbit = configService.get('rabbit');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [rabbit.host],
            queue: rabbit.queues.permission,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
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
export class AppModule {}
