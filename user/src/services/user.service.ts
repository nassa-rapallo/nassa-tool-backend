import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/model/user/CreateUserDto';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { SECTIONS } from 'src/entities/role.entity';
import { GetByIdDto } from 'src/model/GetByIdDto';
import { GetByEmailDto } from 'src/model/GetByEmailDto';
import { ChangingPasswordDto } from 'src/model/user/ChangingPasswordDto';
import { UpdateUserDto } from 'src/model/user/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const hashed = await hash(createUser.password, 12);
    const user = await this.userRepository.save({
      ...createUser,
      password: hashed,
    });

    return user;
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async searchByEmail(data: GetByEmailDto): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: data.email },
      relations: ['roles'],
    });
  }

  async searchById(data: GetByIdDto): Promise<User | undefined> {
    return this.userRepository.findOneOrFail({
      where: { id: data.id },
      relations: ['roles'],
    });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    const compared = await compare(password, user.password);
    return compared;
  }

  async isAdmin(user: User, section: string = SECTIONS.ALL): Promise<boolean> {
    const userRole = user.roles.find((role) => role.section === section);
    return userRole ? userRole.isAdmin : false;
  }

  async confirmUser(data: GetByIdDto): Promise<void> {
    await this.userRepository.update({ id: data.id }, { confirmed: true });
  }

  async toggleChangingPassword(data: ChangingPasswordDto): Promise<void> {
    await this.userRepository.update(
      { id: data.id },
      { changing_password: data.operation },
    );
  }

  async updateUser(data: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id: data.id }, { ...data.userData });
  }
}
