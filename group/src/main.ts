import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { Group } from './group.module';
// import getAmqUrl from './lib/utils/getAmqUrl';
import { ConfigService, RabbitConf } from './services/config/config.service';

async function bootstrap() {
  const rabbit = new ConfigService().get<RabbitConf>('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(Group, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbit.host],
      queue: rabbit.queue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}
bootstrap();
