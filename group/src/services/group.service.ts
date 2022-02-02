import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from 'src/entities/group.entity';
import * as Dto from 'src/model/group/dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
  ) {}

  async groupGetAll(): Promise<Group[]> {
    return this.repository.find();
  }

  async groupGet(data: Dto.GroupGet): Promise<Group> {
    return this.repository.findOneOrFail({ id: data.id });
  }

  async groupGetbyName(data: Dto.GroupGetByName): Promise<Group> {
    return this.repository.findOneOrFail({ where: { name: data.name } });
  }

  async groupGetByCodename(data: { codeName: string }): Promise<Group> {
    return this.repository.findOneOrFail({
      where: { codeName: data.codeName },
    });
  }

  async groupCreate(data: Dto.GroupCreate): Promise<Group> {
    return this.repository.save(data);
  }

  async groupUpdate(data: Dto.GroupUpdate): Promise<void> {
    await this.repository.update(
      { id: data.id },
      { name: data.groupData.name },
    );
  }

  async groupDelete(data: Dto.GroupDelete): Promise<void> {
    await this.repository.delete({ id: data.id });
  }
}
