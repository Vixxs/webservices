import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Category } from './entities/category.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllMovies(query: PaginateQuery): Promise<Paginated<Movie>> {
    return await paginate(query, this.movieRepository, {
      sortableColumns: ['id'],
      relations: ['categories'],
      defaultLimit: 5,
    });
  }

  async getMovieById(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    // Find the categories by their IDs

    const categoryEntities = await this.categoryRepository.find({
      where: {
        id: In(createMovieDto.categoryIds),
      },
    });

    if (categoryEntities.length !== createMovieDto.categoryIds.length) {
      throw new BadRequestException('Some categories not found');
    }

    // Create a new movie and associate categories
    const newMovie = this.movieRepository.create({
      ...createMovieDto,
      categories: categoryEntities, // Associate categories with the new movie
      releaseDate: new Date(createMovieDto.releaseDate), // Convert the release date to a Date object
    });

    return await this.movieRepository.save(newMovie);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.getMovieById(id);

    // Check if there are category IDs to update
    if (updateMovieDto.categoryIds && updateMovieDto.categoryIds.length > 0) {
      const categoryEntities = await this.categoryRepository.find({
        where: { id: In(updateMovieDto.categoryIds) },
      });

      if (categoryEntities.length !== updateMovieDto.categoryIds.length) {
        throw new BadRequestException('Some categories not found');
      }

      // Assign categories to the movie
      movie.categories = categoryEntities;
    }

    // Assign other fields to the movie
    //remove categoryIds from the updateMovieDto
    Object.assign(movie, {
      ...updateMovieDto,
      categoryIds: undefined, // Exclude categoryIds from the result
    });

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(id: number): Promise<void> {
    const movie = await this.getMovieById(id); // Check if the movie exists
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    await this.movieRepository.delete(id);
  }

  async searchMovie(title: string) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.title ILIKE :title', { title: `%${title}%` })
      .orWhere('movie.description ILIKE :title', { title: `%${title}%` })
      .getMany();
  }
}
