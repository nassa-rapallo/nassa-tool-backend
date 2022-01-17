import { Response } from '../Response';

export type DecodeTokenResponse = Promise<Response<{ userId: string }>>;
