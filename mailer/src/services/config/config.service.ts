export type RabbitConf = {
  host: string;
  queue: string;
};

export type EnvConfig = {
  host?: string;
  rabbit?: RabbitConf;
  isEmailDisabled?: boolean;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.host = process.env.HOST;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_MAILER_QUEUE_NAME,
    };

    this.envConfig.isEmailDisabled =
      process.env.MAILER_DISABLED === 'false' ? false : true;
  }

  get<ReturnType>(key: keyof EnvConfig): ReturnType {
    return <ReturnType | any>this.envConfig[key];
  }
}
