import { Permission } from 'src/model/Permission';

export class PermissionIsPermittedDto {
  action: string;

  roles: {
    global?: string;
    section?: string;
  };
}
