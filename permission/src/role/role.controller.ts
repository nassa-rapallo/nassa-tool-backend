import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { PermissionService } from '../permission/permission.service';

@Controller()
export class RoleController {
  constructor(private readonly appService: PermissionService) {}

  @MessagePattern('permission_hello')
  getHello(): string {
    return 'Permission Hello';
  }
}
