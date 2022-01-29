import { ConfigService } from 'src/services/config/config.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/model/user/CreateUserDto';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { GetByIdDto } from 'src/model/GetByIdDto';
import { GetByEmailDto } from 'src/model/GetByEmailDto';
import { ChangingPasswordDto } from 'src/model/user/ChangingPasswordDto';
import { UpdateUserDto } from 'src/model/user/UpdateUserDto';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<User> {
    const defaultRole = await this.roleRepository.findOne({
      where: {
        name: this.configService.get<string>('role') || '',
        section: this.configService.get<string>('section') || '',
      },
    });

    const hashed = await hash(createUser.password, 12);
    const user = await this.userRepository.save({
      ...createUser,
      password: hashed,
      roles: defaultRole ? [defaultRole] : [],
    });

    return user;
  }

  async getUsers() {
    return this.userRepository.find();
  }

  async updateUser(data: UpdateUserDto): Promise<void> {
    await this.userRepository.update({ id: data.id }, { ...data.userData });
  }

  async deleteUser(data: GetByIdDto): Promise<void> {
    await this.userRepository.delete({ id: data.id });
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

  async isAdmin(user: User, section: string): Promise<boolean> {
    const userRole = user.roles.find((role) => role.section.name === section);
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
}
