import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTemplateDto } from './dtos/create-template.dto';
import { TemplateResponseDto } from './dtos/template-response.dto';
import { TemplateModel } from './models/template.model';
import * as iTemplateRepository from './repositories/i-template.repository';

@Injectable()
export class TemplateService {
  constructor(
    @Inject('ITemplateRepository')
    private readonly templateRepository: iTemplateRepository.ITemplateRepository,
  ) {}

  async create(
    createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateResponseDto> {
    const templateModel =
      await this.templateRepository.create(createTemplateDto);
    return templateModel.toResponseDto();
  }

  /**
   * Récupère tous les templates
   */
  async findAll(): Promise<TemplateResponseDto[]> {
    const templates: TemplateModel[] = await this.templateRepository.findAll();
    return templates.map((template) => template.toResponseDto());
  }

  async findOne(id: number): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findById(id);
    if (!template) {
      throw new NotFoundException(`Template avec l'ID ${id} introuvable`);
    }
    return template.toResponseDto();
  }

  async delete(id: number): Promise<void> {
    const template = await this.templateRepository.findById(id);
    if (!template) {
      throw new NotFoundException(`Template avec l'ID ${id} introuvable`);
    }
    await this.templateRepository.delete(id);
  }
}