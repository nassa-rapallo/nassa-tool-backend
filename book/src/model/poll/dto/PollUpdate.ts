import { Poll } from 'src/entities/poll.entity';
import { PollGet } from './PollGet';

export class PollUpdate extends PollGet {
  pollData: Partial<Omit<Poll, 'id'>>;
}
