import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class Created<Data> extends DefaultResponse {
  data: Data;
}
