import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { ITemplateRepository } from '../../../../../modules/template/interfaces/i-template.repository';
import { CreateTemplateDto } from '../../../../../modules/template/dtos/create-template.dto';
import { TemplateModel } from '../../../../../modules/template/models/template.model';

@Injectable()
export class SupabaseTemplateRepository implements ITemplateRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  private get supabase() {
    return this.supabaseService.getClient();
  }

  async create(data: CreateTemplateDto): Promise<TemplateModel> {
    const { data: template, error } = await this.supabase
      .from('templates')
      .insert({
        name: data.name,
        secret: data.secret,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erreur lors de la création du template: ${error.message}`);
    }

    return  new TemplateModel(
      template.id,
      template.name,
      template.secret,
    );
  }

  async findAll(): Promise<TemplateModel[]> {
    const { data: templates, error } = await this.supabase
      .from('templates')
      .select('*')

    if (error) {
      throw new Error(`Erreur lors de la récupération des templates: ${error.message}`);
    }

    return templates.map((template) => new TemplateModel(
      template.id,
      template.name,
      template.secret,
    ));
  }

  async findById(id: number): Promise<TemplateModel | null> {
    const { data: template, error } = await this.supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Erreur lors de la récupération du template: ${error.message}`);
    }

    return  new TemplateModel(
      template.id,
      template.name,
      template.secret,
    );
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) {
      throw new NotFoundException(`Template avec l'ID ${id} introuvable`);
    }
  }
}