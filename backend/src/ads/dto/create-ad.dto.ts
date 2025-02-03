import {
  IsString,
  IsUrl,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAdDto {
  @IsString({ message: 'El título debe ser texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El título no puede exceder 100 caracteres' })
  title: string;

  @IsString({ message: 'La descripción debe ser texto' })
  @IsOptional()
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsUrl({}, { message: 'La URL no es válida' })
  url: string;

  @IsString({ message: 'El tipo debe ser texto' })
  type: string;

  @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
  @IsOptional()
  status?: boolean;
}
