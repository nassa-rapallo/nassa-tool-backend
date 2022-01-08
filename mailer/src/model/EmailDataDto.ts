import { Context } from './Context';
import { Templates } from './Templates';

export type EmailData = {
  to: string;
  subject: string;
  from?: string;
  template?: Templates;
  html?: string;
  context?: Context;
};
