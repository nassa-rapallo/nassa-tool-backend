import { Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authorization.guard';
import { SameUserGuard } from './sameUser.guard';
import { ValidationGuard } from './validation.guard';

type GuardProvider = {
  provide: string;
  useClass: Type<any>;
};

export const Auth: GuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

export const Validation: GuardProvider = {
  provide: APP_GUARD,
  useClass: ValidationGuard,
};

export const SameUser: GuardProvider = {
  provide: APP_GUARD,
  useClass: SameUserGuard,
};

export default [Auth, Validation, SameUser];
