export type RabbitConf = {
  host: string;
  queue: string;
};

export type EnvConfig = {
  client?: string;
  rabbit?: RabbitConf;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.client = process.env.CLIENT;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_USER_QUEUE_NAME,
    };
  }

  get<ReturnType>(key: keyof EnvConfig): ReturnType {
    return <ReturnType | any>this.envConfig[key];
  }
}
