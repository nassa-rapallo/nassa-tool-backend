import { SetMetadata } from '@nestjs/common';

export const ProtectedAction = (action: string) => SetMetadata('protected-action', action);
