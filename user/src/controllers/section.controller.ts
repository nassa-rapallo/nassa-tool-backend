import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  SECTION_CREATE,
  SECTION_DELETE,
  SECTION_GET,
  SECTION_GET_ALL,
  SECTION_UPDATE,
} from 'src/messages/command';
import {
  CREATE_SECTION,
  DELETE_SECTION,
  GET_ALL_SECTIONS,
  GET_SECTION,
  UPDATE_SECTION,
} from 'src/messages/response';
import { SectionCreateDto } from 'src/model/section/SectionCreateDto';
import { SectionGetDto } from 'src/model/section/SectionGetDto';
import { SectionUpdateDto } from 'src/model/section/SectionUpdateDto';
import {
  SectionDeleteResponse,
  SectionResponse,
  SectionSearchAllResponse,
  SectionUpdateResponse,
} from 'src/responses/SectionResponses';
import { SectionService } from 'src/services/section.service';

@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @MessagePattern(SECTION_GET_ALL)
  async sectionGetAll(): SectionSearchAllResponse {
    const sections = await this.sectionService.getAllSections();

    if (!sections)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_ALL_SECTIONS.BAD_REQUEST,
        data: undefined,
      };

    return {
      status: HttpStatus.OK,
      message: GET_ALL_SECTIONS.SUCCESS,
      data: { sections },
    };
  }

  @MessagePattern(SECTION_GET)
  async sectionGet(data: SectionGetDto): SectionResponse {
    try {
      const section = await this.sectionService.getSectionById(data);

      return {
        status: HttpStatus.OK,
        message: GET_SECTION.SUCCESS,
        data: { section },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: GET_SECTION.BAD_REQUEST,
        data: undefined,
      };
    }
  }

  @MessagePattern(SECTION_CREATE)
  async sectionCreate(data: SectionCreateDto): SectionResponse {
    try {
      const section = await this.sectionService.createSection(data);

      if (!section)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: CREATE_SECTION.BAD_REQUEST,
          data: undefined,
        };

      return {
        status: HttpStatus.CREATED,
        message: CREATE_SECTION.SUCCESS,
        data: { section },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: CREATE_SECTION.BAD_REQUEST,
        data: undefined,
      };
    }
  }

  @MessagePattern(SECTION_UPDATE)
  async sectionUpdate(data: SectionUpdateDto): SectionUpdateResponse {
    try {
      await this.sectionService.updateSection(data);

      const updatedSection = await this.sectionService.getSectionById({
        id: data.id,
      });

      return {
        status: HttpStatus.OK,
        message: UPDATE_SECTION.SUCCESS,
        data: {
          updated: true,
          section: updatedSection,
        },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: UPDATE_SECTION.BAD_REQUEST,
        data: { updated: false },
      };
    }
  }

  @MessagePattern(SECTION_DELETE)
  async sectionDelete(data: SectionGetDto): SectionDeleteResponse {
    try {
      await this.sectionService.deleteSection(data);

      return {
        status: HttpStatus.OK,
        message: DELETE_SECTION.SUCCESS,
        data: { deleted: true },
      };
    } catch {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: DELETE_SECTION.BAD_REQUEST,
        data: { deleted: false },
      };
    }
  }
}
