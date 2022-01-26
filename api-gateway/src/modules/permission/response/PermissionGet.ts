import { Rule } from 'src/model/Rule';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class PermissionGet extends DefaultResponse {
  data: {
    action: Rule;
  };
}
