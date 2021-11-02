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

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUser: createUserDto) {
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async searchByEmail(data: { email: string }): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: data.email } });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return verify(user.password, password);
  }
}
