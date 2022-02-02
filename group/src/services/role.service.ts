import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Role } from 'src/entities/role.entity';
import * as Dto from 'src/model/role/dto';
import { Group } from 'src/entities/group.entity';
import Types from 'src/shared/Types';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly repository: Repository<Role>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async roleGetAll(): Promise<Role[]> {
    return this.repository.find({ relations: ['group'] });
  }

  async roleGetByGroup(data: Dto.RoleGetByGroup): Promise<Role[]> {
    return this.repository.find({
      where: { group: { id: data.groupId } },
      order: { position: 'ASC' },
      relations: ['group'],
    });
  }

  async roleGetByType(data: Dto.RoleGetByType): Promise<Role> {
    return this.repository.findOneOrFail({
      where: { group: { id: data.groupId }, type: data.type },
      relations: ['group'],
    });
  }

  async roleGet(data: Dto.RoleGet): Promise<Role> {
    return this.repository.findOneOrFail(
      { id: data.id },
      { relations: ['group'] },
    );
  }

  async roleCreate(data: {
    roleData: {
      name: string;
      position: number;
      type?: Types;
    };
    group: Group;
  }): Promise<Role> {
    const role = this.repository.create(data.roleData);
    role.group = data.group;

    return role;
  }

  async roleUpdate(data: Dto.RoleUpdate): Promise<void> {
    await this.repository.update({ id: data.id }, { ...data.roleData });
  }

  async roleDelete(data: Dto.RoleDelete): Promise<void> {
    await this.repository.delete({ id: data.id });
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async roleMovePosition(data: {
    id: string;
    newPosition: number;
  }): Promise<void> {
    await this.repository.update(
      { id: data.id },
      { position: data.newPosition },
    );
  }
}
