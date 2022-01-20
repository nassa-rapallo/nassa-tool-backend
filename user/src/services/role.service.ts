import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { GetByIdDto } from 'src/model/GetByIdDto';
import { DeleteRoleDto } from 'src/model/role/DeleteRoleDto';
import { GetBySectionDto } from 'src/model/role/GetBySectionDto';
import { RoleDto } from 'src/model/role/RoleDto';
import { UpdateRoleDto } from 'src/model/role/UpdateRoleDto';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async getRole({ name, section }: RoleDto): Promise<Role | undefined> {
    return this.roleRepository.findOne({ section, name });
  }

  async getRoleById(data: GetByIdDto): Promise<Role | undefined> {
    return this.roleRepository.findOne({ id: data.id });
  }

  async getRolesBySection(data: GetBySectionDto): Promise<Role[] | undefined> {
    return this.roleRepository.find({
      where: { section: data.section },
    });
  }

  async createRole({ name, section }: RoleDto): Promise<Role | undefined> {
    const isAlreadyPresent = await this.roleRepository.findOne({
      where: { name: name, section: section },
    });

    if (isAlreadyPresent) return undefined;
    return this.roleRepository.save({ name: name, section: section });
  }

  async updateRole(data: UpdateRoleDto): Promise<void> {
    await this.roleRepository.update({ id: data.id }, { ...data.roleData });
  }

  async deleteRole(data: DeleteRoleDto): Promise<void> {
    await this.roleRepository.delete({ id: data.id });
  }

  async getUsersByRole({
    name,
    section,
  }: RoleDto): Promise<User[] | undefined> {
    const role = await this.roleRepository.findOne({
      where: { name: name, section: section },
    });
    if (!role) return undefined;

    return role.users;
  }
}
