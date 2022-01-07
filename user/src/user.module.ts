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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [UserController, RoleController, LinkController],
  providers: [ConfigService, UserService, RoleService, LinkService],
})
export class UserModule {}
