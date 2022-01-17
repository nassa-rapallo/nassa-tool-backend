import { Response } from 'src/lib/Response';

export type TokenDestroyResponse = Promise<Response<{ destroyed: boolean }>>;
