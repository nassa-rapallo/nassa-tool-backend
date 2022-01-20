import { User } from 'src/model/User';
import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class UserUpdate extends DefaultResponse {
  data: {
    updated: boolean;
    user?: User;
  };
}
