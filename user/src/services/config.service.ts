export type RabbitConf = {
  host: string;
  queue: string;
};

export type DBConf = {
  host: string;
  name: string;
  port: number;
  username: string;
  password: string;
};

export type EnvConfig = {
  host?: string;
  rabbit?: RabbitConf;
  db?: DBConf;
};

export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    this.envConfig.host = process.env.HOST;

    this.envConfig.rabbit = {
      host: process.env.RABBITMQ_FULL_HOST,
      queue: process.env.RABBITMQ_USER_QUEUE_NAME,
    };

    this.envConfig.db = {
      host: process.env.DB_HOST,
      name: process.env.POSGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.DB_PORT,
    };
  }

  get<ReturnType>(key: keyof EnvConfig): ReturnType {
    return <ReturnType | any>this.envConfig[key];
  }
}
