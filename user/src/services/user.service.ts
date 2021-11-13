import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { createUserDto } from 'src/model/createUserDto';
import { Repository } from 'typeorm';
import { verify } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: createUserDto): Promise<User> {
    return this.userRepository.save({ ...createUser });
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async searchByEmail(data: { email: string }): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: data.email },
      relations: ['roles'],
    });
  }

  async searchById(data: { id: string }): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: data.id },
      relations: ['roles'],
    });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return verify(user.password, password);
  }
}
