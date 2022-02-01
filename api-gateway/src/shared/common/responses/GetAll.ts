import { DefaultResponse } from 'src/shared/types/Response/DefaultResponse';

export class GetAll<Data> extends DefaultResponse {
  data: Data;
}
