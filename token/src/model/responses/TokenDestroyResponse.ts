import { Response } from '../Response';

export type TokenDestroyResponse = Promise<Response<{ destroyed: boolean }>>;
