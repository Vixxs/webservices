import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { HalInterceptor } from './interceptors/hal.movie.interceptor';
import { MovieService } from './movies.service';

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
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
  async getMovieById(@Param('id') id: number): Promise<Movie> {
    return await this.movieService.getMovieById(id);
  }

  @Post()
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
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
