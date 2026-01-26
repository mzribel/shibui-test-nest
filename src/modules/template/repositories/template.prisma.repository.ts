import { CreateTemplateDto } from '@/modules/template/dtos/create-template.dto';
import { Template } from '@/modules/template/models/template';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { ITemplateRepository } from '@/modules/template/repositories/i.template.repository';

@Injectable()
export class PrismaTemplateRepository implements ITemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTemplateDto): Promise<Template> {
    const template = await this.prisma.template.create({
      data: {
        name: data.name,
        secret: data.secret,
      },
    });

    return new Template(
      template.id,
      template.name,
      template.secret,
    );
  }

  async findAll(): Promise<Template[]> {
    const templates = await this.prisma.template.findMany();

    return templates.map(
      (template) =>
        new Template(
          template.id,
          template.name,
          template.secret,
        ),
    );
  }

  async findById(id: number): Promise<Template | null> {
    const template = await this.prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      return null;
    }

    return new Template(
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