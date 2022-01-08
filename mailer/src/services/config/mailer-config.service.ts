import {
  MailerOptionsFactory,
  MailerOptions,
  HandlebarsAdapter,
} from '@nest-modules/mailer';
import { SecureVersion } from 'tls';
import { join } from 'path';

export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: Boolean(process.env.MAILER_SECURE),
        logger: Boolean(process.env.MAILER_LOGGER),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
        tls: {
          minVersion: process.env.MAILER_TLS_VERSION as SecureVersion,
          ciphers: process.env.MAILER_CIPHERS,
        },
      },
      defaults: {
        from: process.env.MAILER_FROM,
      },
      template: {
        dir: join(__dirname, '../../templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
