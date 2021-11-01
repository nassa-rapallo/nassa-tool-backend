import { ConfigService } from '../../services/config.service';

export default (): string => {
  const rabbit = new ConfigService().get('rabbit');

  const { user, password, host } = rabbit;

  return `amqp://${user}:${password}@${host}`;
};
