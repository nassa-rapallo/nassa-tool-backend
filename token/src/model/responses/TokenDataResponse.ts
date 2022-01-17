import { Response } from '../Response';

export type TokenDataResponse = Promise<Response<{ userId: string }>>;
