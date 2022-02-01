import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Connection, Repository } from 'typeorm';

import * as Dto from 'src/model/role/dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async save(data: { role }): Promise<void> {
    await this.connection.manager.save(data.role);
  }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async get(data: Dto.Get): Promise<Role> {
    return this.roleRepository.findOneOrFail({ id: data.id });
  }

  async getByCluster(data: Dto.GetByCluster): Promise<Role> {
    return this.roleRepository.findOneOrFail({
      where: { roleId: data.roleId, groupId: data.groupId },
    });
  }

  async getByGroup(data: { groupId: string }): Promise<Role[] | undefined> {
    return this.roleRepository.find({
      where: { groupId: data.groupId },
    });
  }

  async create(data: Dto.Create): Promise<Role> {
    return this.roleRepository.save(data);
  }

  async update(data: Dto.Update): Promise<void> {
    await this.roleRepository.update({ id: data.id }, { ...data.roleData });
  }

  async delete(data: Dto.Delete): Promise<void> {
    await this.roleRepository.delete({ id: data.id });
  }
}
