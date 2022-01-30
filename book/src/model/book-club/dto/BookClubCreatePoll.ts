import { PollCreate } from 'src/model/poll/dto';

export class BookClubCreatePoll extends PollCreate {
  bookIds: string[];
}
