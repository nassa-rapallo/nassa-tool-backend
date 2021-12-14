import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TOKEN_SERVICE } from 'src/clients';
import { ConfigService } from 'src/services/config/config.service';

export const TokenProvider: Provider = {
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
};
