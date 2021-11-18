import { Response } from 'src/lib/Response';

export type LoginUserResponse = Response<{ token: string }>;
