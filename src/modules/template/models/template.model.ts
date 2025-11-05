import { TemplateResponseDto } from '../dtos/template-response.dto';

export class TemplateModel {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly secret: string | null,
  ) {}

  toResponseDto(): TemplateResponseDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
