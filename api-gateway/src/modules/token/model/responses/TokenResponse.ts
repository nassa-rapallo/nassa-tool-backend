import { Response } from 'src/lib/Response';

export type TokenResponse = Promise<Response<{ token: string }>>;
