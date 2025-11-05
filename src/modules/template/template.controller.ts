import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/create-template.dto';
import { TemplateResponseDto } from './dtos/template-response.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async create(
    @Body() createTemplateDto: CreateTemplateDto,
  ): Promise<TemplateResponseDto> {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  async findAll(): Promise<TemplateResponseDto[]> {
    return this.templateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TemplateResponseDto> {
    return this.templateService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.templateService.delete(id);
  }
}