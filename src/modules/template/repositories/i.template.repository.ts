import { TemplateModel } from '../models/template.model';
import { CreateTemplateDto } from '../dtos/create-template.dto';

export interface ITemplateRepository {
  create(data: CreateTemplateDto): Promise<TemplateModel>;
  findAll(): Promise<TemplateModel[]>;
  findById(id: number): Promise<TemplateModel | null>;
  delete(id: number): Promise<void>;
}
