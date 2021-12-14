type RabbitQueue = {
  [key: string]: string;
};

export type EnvConfig = {
  port?: string;
  rabbit?: {
    host: string;
    queues: RabbitQueue;
  };
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.port = process.env.API_GATEWAY_PORT;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queues: {
        user: process.env.RABBITMQ_USER_QUEUE_NAME,
        token: process.env.RABBITMQ_TOKEN_QUEUE_NAME,
        permission: process.env.RABBITMQ_PERMISSION_QUEUE_NAME,
        mailer: process.env.RABBITMQ_MAILER_QUEUE_NAME,
      },
    };
  }

  get(key: keyof EnvConfig): any {
    return this.envConfig[key];
  }
}
