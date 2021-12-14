export type RabbitConf = {
  host: string;
  queue: string;
};

export type EnvConfig = {
  host?: string;
  rabbit?: RabbitConf;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.host = process.env.HOST;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_MAILER_QUEUE_NAME,
    };
  }

  get<ReturnType>(key: keyof EnvConfig): ReturnType {
    return <ReturnType | any>this.envConfig[key];
  }
}
