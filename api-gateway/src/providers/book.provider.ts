import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BOOK_SERVICE } from 'src/services/clients/clientsName';
import { ConfigService } from 'src/services/config/config.service';

export const BookProvider: Provider = {
  provide: BOOK_SERVICE,
  useFactory: (configService: ConfigService) => {
    const rabbit = configService.get('rabbit');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbit.host],
        queue: rabbit.queues.book,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
