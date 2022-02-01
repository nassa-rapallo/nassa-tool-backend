import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/entities/link.entity';
import { Repository } from 'typeorm';
import { ConfigService } from './config/config.service';
import { v4 as uuid } from 'uuid';

import * as Dto from 'src/model/link/dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    private readonly configService: ConfigService,
  ) {}

  async create(data: Dto.CreateLink): Promise<Link> {
    const linkId = uuid();
    return this.linkRepository.save({
      user_id: data.user_id,
      type: data.type,
      link: linkId,
    });
  }

  async getLinkFromData({ user_id, type }: Dto.GetLink): Promise<Link> {
    return this.linkRepository.findOneOrFail({
      where: { user_id, type, is_used: false },
    });
  }

  async getLink(data: { link: string }): Promise<Link> {
    return this.linkRepository.findOneOrFail({ where: { link: data.link } });
  }

  async getWebLink(data: { link: string }): Promise<string> {
    return `${this.configService.get('client')}/users/confirm/${data.link}`;
  }

  async useLink(data: { link: string }): Promise<void> {
    this.linkRepository.update({ link: data.link }, { is_used: true });
  }
}
