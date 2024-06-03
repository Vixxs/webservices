import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(128)
  name: string;

  @IsString()
  @MaxLength(2048)
  description: string;

  @IsDateString()
  releaseDate: string; // Changed from IsDate to IsDateString

  @IsArray()
  @IsOptional()
  categoryUids: string[]; // New field to add category IDs

  @IsInt()
  @Min(0)
  @Max(5)
  rate: number;

  @IsInt()
  @Min(0)
  @Max(240)
  duration: number;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}

export class UpdateMovieDto extends CreateMovieDto {}
