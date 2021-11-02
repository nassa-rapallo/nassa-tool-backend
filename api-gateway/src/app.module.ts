import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigService } from './services/config/config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { AuthController } from './routes/auth.controller';
import { USER_SERVICE, TOKEN_SERVICE } from './clients';

@Module({
  imports: [],
  controllers: [AppController, UserController, AuthController],
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
  ],
})
export class AppModule {}
