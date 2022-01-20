import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class RoleDeleted extends DefaultResponse {
  data: {
    deleted: boolean;
  };
}
