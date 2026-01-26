import { Template } from '../models/template';
import { CreateTemplateDto } from '../dtos/create-template.dto';

export interface ITemplateRepository {
  create(data: CreateTemplateDto): Promise<Template>;
  findAll(): Promise<Template[]>;
  findById(id: number): Promise<Template | null>;
  delete(id: number): Promise<void>;
}
