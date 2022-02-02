import { Permission } from 'src/model/Permission';
import { Get } from './Get';

export class Update extends Get {
  permissionData: Partial<Permission>;
}
