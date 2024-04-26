import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MovieService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    return await this.movieService.getAllMovies(query);
  }

  @Get(':id')
  async getMovieById(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.getMovieById(id);
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number): Promise<void> {
    return await this.movieService.deleteMovie(id);
  }

  @Post('search/:title')
  async searchMovie(@Param('title') title: string) {
    return await this.movieService.searchMovie(title);
  }
}
