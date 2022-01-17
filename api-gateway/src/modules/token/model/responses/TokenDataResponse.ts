import { Response } from 'src/lib/Response';

export type TokenDataResponse = Promise<Response<{ userId: string }>>;
