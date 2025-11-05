/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsOptional,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(20)
  secret: string;
}
