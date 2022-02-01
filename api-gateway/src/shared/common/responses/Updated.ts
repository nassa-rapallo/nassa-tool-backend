import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class Updated extends DefaultResponse {
  data: {
    updated: boolean;
  };
}
