import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { SectionCreateDto } from 'src/model/section/SectionCreateDto';
import { SectionGetDto } from 'src/model/section/SectionGetDto';
import { SectionUpdateDto } from 'src/model/section/SectionUpdateDto';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async getAllSections(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async getSectionById(data: SectionGetDto): Promise<Section> {
    return this.sectionRepository.findOneOrFail({ id: data.id });
  }

  async getSectionByName(data: { name: string }): Promise<Section> {
    return this.sectionRepository.findOneOrFail({ name: data.name });
  }

  async createSection(data: SectionCreateDto): Promise<Section> {
    return this.sectionRepository.save({ name: data.name });
  }

  async updateSection(data: SectionUpdateDto): Promise<void> {
    await this.sectionRepository.update({ id: data.id }, data.sectionData);
  }

  async deleteSection(data: SectionGetDto): Promise<void> {
    await this.sectionRepository.delete({ id: data.id });
  }
}
