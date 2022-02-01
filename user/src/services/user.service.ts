import { ConfigService } from 'src/services/config/config.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { Role } from 'src/entities/role.entity';

import * as Dto from 'src/model/user/dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    private readonly connection: Connection,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async save(data: { user: User }): Promise<void> {
    await this.connection.manager.save(data.user);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async getByEmail(data: Dto.GetByEmail): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email: data.email },
      relations: ['roles'],
    });
  }

  async get(data: Dto.Get): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id: data.id },
      relations: ['roles'],
    });
  }

  async create(data: Dto.Create): Promise<User> {
    const hashed = await hash(data.password, 12);
    return this.userRepository.save({
      ...data,
      password: hashed,
    });
  }

  async update(data: Dto.Update): Promise<void> {
    await this.userRepository.update({ id: data.id }, { ...data.userData });
  }

  async delete(data: Dto.Get): Promise<void> {
    await this.userRepository.delete({ id: data.id });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    const compared = await compare(password, user.password);
    return compared;
  }

  async confirm(data: Dto.Get): Promise<void> {
    await this.userRepository.update({ id: data.id }, { confirmed: true });
  }

  async toggleChangingPassword(data: Dto.ChangingPassword): Promise<void> {
    await this.userRepository.update(
      { id: data.id },
      { changing_password: data.operation },
    );
  }
}
