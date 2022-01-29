import { Poll } from 'src/entities/poll.entity';
import { Response } from 'src/shared/Response';

/* -------------------------------------------------------------------------- */
/*                                    CRUD                                    */
/* -------------------------------------------------------------------------- */
export type PollGetAllResponse = Promise<Response<{ polls: Poll[] }>>;
export type PollGetResponse = Promise<Response<{ poll: Poll }>>;
export type PollCreateResponse = Promise<Response<{ poll: Poll }>>;
export type PollUpdatedResponse = Promise<
  Response<{ updated: boolean; poll?: Poll }>
>;
export type PollDeletedResponse = Promise<Response<{ deleted: boolean }>>;

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONALITIES                              */
/* -------------------------------------------------------------------------- */

export type PollAddedVoterResopnse = Promise<
  Response<{ added: boolean; voter: string }>
>;

export type PollVoterHasVotedResponses = Promise<
  Response<{ voted: boolean; voter: string }>
>;
