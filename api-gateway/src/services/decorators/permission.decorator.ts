import { SetMetadata } from '@nestjs/common';
import { Permission as PermissionType } from 'src/shared/Permission';

export const Permission = (permission: PermissionType) =>
  SetMetadata('permission', permission);
