import { SetMetadata } from '@nestjs/common';
import { Permission as PermissionType } from 'src/lib/Permission';

export const Permission = (permission: PermissionType) =>
  SetMetadata('permission', permission);
