import { IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(64)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  description?: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(64)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  description?: string;
}
