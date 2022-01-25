import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { USER_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/section/dto';
import * as Responses from 'src/modules/section/response';

@Injectable()
export class SectionService {
  constructor(@Inject(USER_SERVICE) private readonly sectionClient: ClientProxy) {}

  async sectionGetAll(): Promise<Responses.SectionGetAll> {
    return firstValueFrom(
      this.sectionClient.send<Responses.SectionGetAll>(COMMANDS.SECTION_GET_ALL, {}),
    );
  }

  async sectionGet(data: Dto.SectionGetDto): Promise<Responses.Section> {
    return firstValueFrom(
      this.sectionClient.send<Responses.Section, Dto.SectionGetDto>(COMMANDS.SECTION_GET, data),
    );
  }

  async sectionCreate(data: Dto.SectionCreateDto): Promise<Responses.Section> {
    return firstValueFrom(
      this.sectionClient.send<Responses.Section, Dto.SectionCreateDto>(
        COMMANDS.SECTION_CREATE,
        data,
      ),
    );
  }

  async sectionUpdate(data: Dto.SectionUpdateDto): Promise<Responses.SectionUpdated> {
    return firstValueFrom(
      this.sectionClient.send<Responses.SectionUpdated, Dto.SectionUpdateDto>(
        COMMANDS.SECTION_UPDATE,
        data,
      ),
    );
  }

  async sectionDelete(data: Dto.SectionGetDto): Promise<Responses.SectionDeleted> {
    return firstValueFrom(
      this.sectionClient.send<Responses.SectionDeleted, Dto.SectionGetDto>(
        COMMANDS.SECTION_DELETE,
        data,
      ),
    );
  }
}
