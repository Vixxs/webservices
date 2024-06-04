import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Movie } from './entities/movie.entity';
import { HalInterceptor } from './interceptors/hal.movie.interceptor';
import { MovieService } from './movies.service';

@Controller('movies')
@UseGuards(RolesGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    return await this.movieService.getAllMovies(query);
  }

  @Get(':uid')
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
  async getMovieById(@Param('uid') uid: string): Promise<Movie> {
    return await this.movieService.getMovieByUid(uid);
  }

  @Post()
  @Roles([Role.ADMIN])
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
  async createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.movieService.createMovie(createMovieDto);
  }

  @Put(':uid')
  @Roles([Role.ADMIN])
  @UseInterceptors(HalInterceptor) // Applying the HAL interceptor to the controller
  async updateMovie(
    @Param('uid') uid: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(uid, updateMovieDto);
  }

  @Delete(':uid')
  @Roles([Role.ADMIN])
  async deleteMovie(@Param('uid') uid: string): Promise<void> {
    return await this.movieService.deleteMovie(uid);
  }
}
