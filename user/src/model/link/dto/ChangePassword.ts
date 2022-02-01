import { Get } from 'src/model/user/dto/';

export class ChangePassword extends Get {
  newPassword: string;
  link: string;
}
