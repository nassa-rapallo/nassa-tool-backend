import { Response } from 'src/lib/Response';

export type DecodeTokenResponse = Promise<Response<{ userId: string }>>;
