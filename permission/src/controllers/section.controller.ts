import { SECTION_GET_BY_NAME } from './../model/section/messages/commands';
import { AllSectionsResponse } from './../model/section/response/AllSectionsResponse';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { SectionService } from 'src/services/section.service';
import {
  SECTION_CREATE,
  SECTION_GET_ALL,
  SECTION_GET_BY_ID,
} from 'src/model/section/messages/commands';
import { CreateSectionDto } from 'src/model/section/dto/CreateSectionDto';
import { SectionResponse } from 'src/model/section/response/SectionResponse';
import { SECTION_RESPONSE } from 'src/model/section/messages/response';

@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @MessagePattern(SECTION_CREATE)
  async createSection(
    createSectionDto: CreateSectionDto,
  ): Promise<SectionResponse> {
    try {
      const section = await this.sectionService.createSection(createSectionDto);
      return {
        status: HttpStatus.CREATED,
        message: SECTION_RESPONSE.SECTION_CREATE.CREATED,
        data: { section },
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: SECTION_RESPONSE.SECTION_CREATE.PRECONDITION_FAILED,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(SECTION_GET_ALL)
  async getAllSections(): Promise<AllSectionsResponse> {
    try {
      const sections = await this.sectionService.getAllSections();

      if (!sections)
        return {
          status: HttpStatus.NOT_FOUND,
          message: SECTION_RESPONSE.SECTION_GET_ALL.NOT_FOUND,
          data: null,
        };

      return {
        status: HttpStatus.FOUND,
        message: SECTION_RESPONSE.SECTION_GET_ALL.FOUND,
        data: { sections },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: SECTION_RESPONSE.SECTION_GET_ALL.BAD_REQUEST,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(SECTION_GET_BY_ID)
  async getById(data: { id: string }): Promise<SectionResponse> {
    try {
      const section = await this.sectionService.getSectionById({ id: data.id });

      return {
        status: HttpStatus.FOUND,
        message: SECTION_RESPONSE.SECTION_GET.FOUND,
        data: { section },
      };
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: SECTION_RESPONSE.SECTION_GET.NOT_FOUND,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }

  @MessagePattern(SECTION_GET_BY_NAME)
  async getByName(data: { name: string }): Promise<SectionResponse> {
    try {
      const section = await this.sectionService.getSectionByName({
        name: data.name,
      });

      return {
        status: HttpStatus.FOUND,
        message: SECTION_RESPONSE.SECTION_GET.FOUND,
        data: { section },
      };
    } catch (e) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: SECTION_RESPONSE.SECTION_GET.NOT_FOUND,
        data: null,
        errors: [e.driverError.detail],
      };
    }
  }
}
