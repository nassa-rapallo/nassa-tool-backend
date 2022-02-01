import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class Deleted extends DefaultResponse {
  data: {
    deleted: boolean;
  };
}
