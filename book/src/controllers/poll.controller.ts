import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';

import * as Dto from 'src/model/poll/dto';
import * as C from 'src/model/poll/command';
import * as R from 'src/model/poll/responses';

import { PollService } from 'src/services/poll.service';

@Controller()
export class PollController {
  constructor(private readonly pollService: PollService) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(C.POLL_GET_ALL)
  async bookGetAll(): R.PollGetAllResponse {
    try {
      const polls = await this.pollService.pollGetAll();

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { polls },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.POLL_GET)
  async bookGet(data: Dto.PollGet): R.PollGetResponse {
    try {
      const poll = await this.pollService.pollGet(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { poll },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.POLL_CREATE)
  async bookCreate(data: Dto.PollCreate): R.PollCreateResponse {
    try {
      const poll = await this.pollService.pollCreate(data);

      if (!poll)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'bad_request',
          data: undefined,
        };

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { poll },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.POLL_UPDATE)
  async bookUpdate(data: Dto.PollUpdate): R.PollUpdatedResponse {
    try {
      await this.pollService.pollUpdate(data);
      const updatedPoll = await this.pollService.pollGet({ id: data.id });

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { updated: true, poll: updatedPoll },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { updated: true },
      };
    }
  }

  @MessagePattern(C.POLL_DELETE)
  async bookDelete(data: Dto.PollDelete): R.PollDeletedResponse {
    try {
      await this.pollService.pollDelete(data);

      return {
        status: HttpStatus.OK,
        message: 'success',
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: { deleted: false },
      };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  @MessagePattern(C.POLL_HAS_VOTED)
  async pollHasVoted(data: Dto.PollHasVoted): R.PollVoterHasVotedResponses {
    try {
      const hasVoted = await this.pollService.alreadyVoted(data);

      return {
        status: HttpStatus.OK,
        message: hasVoted ? 'voted' : 'not_voted',
        data: { voted: hasVoted, voter: data.userId },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }

  @MessagePattern(C.POLL_ADD_VOTER)
  async pollAddVoter(data: Dto.PollAddVoter): R.PollAddedVoterResopnse {
    try {
      const voter = await this.pollService.pollAddVoter(data);

      return {
        status: HttpStatus.OK,
        message: voter ? 'added_vote' : 'not_added_vote',
        data: { added: voter, voter: data.userId },
      };
    } catch {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error',
        data: undefined,
      };
    }
  }
}
