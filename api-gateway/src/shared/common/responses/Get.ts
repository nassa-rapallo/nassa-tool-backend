import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class Get<Data> extends DefaultResponse {
  data: Data;
}
