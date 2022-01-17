import { Response } from '../Response';

export type TokenResponse = Promise<Response<{ token: string }>>;
