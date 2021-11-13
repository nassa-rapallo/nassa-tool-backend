import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Section } from 'src/entities/section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDto } from 'src/model/section/dto/CreateSectionDto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
  ) {}

  async createSection(createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionRepository.save({ ...createSectionDto });
  }

  async getAllSections(): Promise<Section[]> {
    return this.sectionRepository.find({ relations: ['rules'] });
  }

  async getSectionById(data: { id: string }): Promise<Section> {
    return this.sectionRepository.findOneOrFail({ id: data.id });
  }

  async getSectionByName(data: { name: string }): Promise<Section> {
    return this.sectionRepository.findOneOrFail({ name: data.name });
  }

  async getSectionByColumn(data: {
    column: keyof Section;
    value: any;
  }): Promise<Section> {
    return this.sectionRepository.findOneOrFail({ [data.column]: data.value });
  }
}
