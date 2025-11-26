import { CreateTemplateDto } from '../../../../modules/template/dtos/create-template.dto';
import { TemplateModel } from '../../../../modules/template/models/template.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITemplateRepository } from '../../../../modules/template/repositories/i.template.repository';

@Injectable()
export class TemplatePrismaRepository implements ITemplateRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(data: CreateTemplateDto): Promise<TemplateModel> {
    const template = await this.prisma.template.create({
      data: {
        name: data.name,
        secret: data.secret,
      },
    });

    return new TemplateModel(
      template.id,
      template.name,
      template.secret,
    );
  }

  async findAll(): Promise<TemplateModel[]> {
    const templates = await this.prisma.template.findMany();

    return templates.map(
      (template) =>
        new TemplateModel(
          template.id,
          template.name,
          template.secret,
        ),
    );
  }

  async findById(id: number): Promise<TemplateModel | null> {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      return null;
    }

    return new TemplateModel(
      template.id,
      template.name,
      template.secret
    );
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.template.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Template avec l'ID ${id} introuvable`);
    }
  }
}