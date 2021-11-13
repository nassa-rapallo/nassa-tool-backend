import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionService } from '../services/permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @MessagePattern('hello_permission')
  getHello(): string {
    return 'Hello from Permission';
  }
}
