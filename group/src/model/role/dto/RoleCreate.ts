import Types from 'src/shared/Types';

export class RoleCreate {
  roleData: {
    name: string;
    position: number;
    type?: Types;
  };
  groupId: string;
}
