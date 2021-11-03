import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { PermissionModule } from './permission.module';
import { ConfigService, RabbitConf } from './config/config.service';

async function bootstrap() {
  const rabbit = new ConfigService().get<RabbitConf>('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PermissionModule,
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

  await app.listen();
}
bootstrap();
