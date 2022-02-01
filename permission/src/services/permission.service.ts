import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';

import * as Dto from 'src/model/permission/dto';
@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async getAll(): Promise<Permission[]> {
    return this.repository.find({ relations: ['rules'] });
  }

  async get(data: Dto.Get): Promise<Permission> {
    return this.repository.findOneOrFail(
      { id: data.id },
      { relations: ['rules'] },
    );
  }

  async getByAction(data: Dto.GetByAction): Promise<Permission> {
    return this.repository.findOne({
      where: { actionId: data.actionId },
      relations: ['rules'],
    });
  }

  async create(data: Dto.Create): Promise<Permission> {
    return this.repository.save(data);
  }

  async update(data: Dto.Update): Promise<void> {
    await this.repository.update({ id: data.id }, { ...data.permissionData });
  }

  async delete(data: Dto.Delete): Promise<void> {
    await this.repository.delete({ id: data.id });
  }
}
