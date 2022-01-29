import { PollGet } from './../model/poll/dto/PollGet';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from 'src/entities/poll.entity';
import { Repository } from 'typeorm';
import {
  PollAddVoter,
  PollCreate,
  PollDelete,
  PollHasVoted,
  PollUpdate,
} from 'src/model/poll/dto';

@Injectable()
export class PollService {
  constructor(@InjectRepository(Poll) private repository: Repository<Poll>) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async pollGetAll(): Promise<Poll[]> {
    return this.repository.find();
  }

  async pollGet(data: PollGet): Promise<Poll> {
    return this.repository.findOneOrFail({ id: data.id });
  }

  async pollCreate(data: PollCreate): Promise<Poll> {
    return this.repository.save(data);
  }

  async pollUpdate(data: PollUpdate): Promise<void> {
    await this.repository.update({ id: data.id }, data.pollData);
  }

  async pollDelete(data: PollDelete): Promise<void> {
    await this.repository.delete({ id: data.id });
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async alreadyVoted(data: PollHasVoted): Promise<boolean> {
    const poll = await this.repository.findOne({ id: data.pollId });
    if (!poll) return false;

    return poll.userIds.find((uid) => uid === data.userId) ? true : false;
  }

  async pollAddVoter(data: PollAddVoter): Promise<boolean> {
    const poll = await this.repository.findOne({ id: data.pollId });
    if (!poll) return false;

    await this.repository.update(
      { id: poll.id },
      { userIds: [...poll.userIds, data.userId] },
    );

    return true;
  }
}
