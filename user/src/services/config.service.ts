export type EnvConfig = {
  host?: string;
  rabbit?: {
    host: string;
    queue: string;
  };
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.host = process.env.HOST;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_USER_QUEUE_NAME,
    };
  }

  get(key: keyof EnvConfig): any {
    return this.envConfig[key];
  }
}
