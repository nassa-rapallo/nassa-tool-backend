import { Role } from './entities/role.entity';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmConfigService } from './services/config/typeorm-config.service';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { LinkService } from './services/link.service';
import { LinkController } from './controllers/link.controller';
import { Link } from './entities/link.entity';
import { Section } from './entities/section.entity';
import { SectionController } from './controllers/section.controller';
import { SectionService } from './services/section.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User, Role, Section, Link]),
  ],
  controllers: [
    UserController,
    RoleController,
    SectionController,
    LinkController,
  ],
  providers: [
    ConfigService,
    UserService,
    RoleService,
    SectionService,
    LinkService,
  ],
})
export class UserModule {}
