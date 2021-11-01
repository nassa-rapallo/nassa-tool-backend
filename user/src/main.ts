import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { UserModule } from './user.module';
// import getAmqUrl from './lib/utils/getAmqUrl';
import { ConfigService } from './services/config.service';

async function bootstrap() {
  const rabbit = new ConfigService().get('rabbit');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
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
