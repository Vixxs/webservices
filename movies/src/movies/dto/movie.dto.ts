import {
  IsString,
  IsOptional,
  IsInt,
  MaxLength,
  IsDate,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(2048)
  description: string;

  @IsDate()
  releaseDate: Date;

  @IsInt()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  posterUrl?: string;
}

export class UpdateMovieDto extends CreateMovieDto {}
