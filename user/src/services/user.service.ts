import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { createUserDto } from 'src/model/createUserDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUser: createUserDto) {
    return this.userRepository.save(createUser);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async searchByEmail(data: { email: string }): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: data.email } });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return user.password === password;
  }
}
