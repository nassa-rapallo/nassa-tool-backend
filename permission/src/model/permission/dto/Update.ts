import { Permission } from 'src/entities/permission.entity';
import { Get } from './Get';

export class Update extends Get {
  permissionData: Partial<Permission>;
}
