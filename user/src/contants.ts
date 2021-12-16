import { Provider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService, RabbitConf } from './services/config/config.service';

export const DEFAULT_ROLE = 'nassarolə';
export const MAILER_SERVICE = 'MAILER_SERVICE';

export const MailerProvider: Provider = {
  provide: MAILER_SERVICE,
  useFactory: (configService: ConfigService) => {
    const rabbit = configService.get<RabbitConf>('rabbit');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbit.host],
        queue: rabbit.mailer,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
