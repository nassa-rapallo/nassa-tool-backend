import { Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authorization.guard';
import { ValidationGuard } from './validation.guard';

type GuardProvider = {
  provide: string;
  useClass: Type<any>;
};

const Auth: GuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

const Validation: GuardProvider = {
  provide: APP_GUARD,
  useClass: ValidationGuard,
};

export default [Auth, Validation];
