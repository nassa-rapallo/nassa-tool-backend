import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class IsAdmin extends DefaultResponse {
  data: {
    admin: boolean;
  };
}
