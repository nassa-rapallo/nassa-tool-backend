import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService, RabbitConf } from './services/config/config.service';
import { TokenModule } from './token.module';

async function bootstrap() {
  const rabbit = new ConfigService().get<RabbitConf>('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TokenModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbit.host],
        queue: rabbit.queue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  app.listen();
}
bootstrap();
