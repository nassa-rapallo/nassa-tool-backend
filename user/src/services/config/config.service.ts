export type RabbitConf = {
  host: string;
  queue: string;
};

export type EnvConfig = {
  client?: string;
  rabbit?: RabbitConf;
  role?: string;
  section?: string;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.client = process.env.CLIENT;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_USER_QUEUE_NAME,
    };

    this.envConfig.role = process.env.DEFAULT_ROLE;
    this.envConfig.section = process.env.GLOBAL_SECTION;
  }

  get<ReturnType>(key: keyof EnvConfig): ReturnType {
    return <ReturnType | any>this.envConfig[key];
  }
}
