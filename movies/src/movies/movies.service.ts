import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { In, Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { Category } from './entities/category.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllMovies(query: PaginateQuery): Promise<Paginated<Movie>> {
    return await paginate<Movie>(query, this.movieRepository, {
      sortableColumns: ['uid'],
      relations: ['categories'],
      searchableColumns: ['name', 'description'],
      defaultLimit: 10,
    });
  }
  async getMovieByUid(uid: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { uid: uid },
      relations: ['categories'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with UID ${uid} not found`);
    }
    return movie;
  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    // Find the categories by their IDs

    const categoryEntities = await this.categoryRepository.find({
      where: {
        uid: In(createMovieDto.categoryUids),
      },
    });

    if (categoryEntities.length !== createMovieDto.categoryUids.length) {
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
    uid: string,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    const movie = await this.getMovieByUid(uid);

    // Check if there are category IDs to update
    if (updateMovieDto.categoryUids && updateMovieDto.categoryUids.length > 0) {
      const categoryEntities = await this.categoryRepository.find({
        where: { uid: In(updateMovieDto.categoryUids) },
      });

      if (categoryEntities.length !== updateMovieDto.categoryUids.length) {
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

  async deleteMovie(uid: string): Promise<void> {
    const movie = await this.getMovieByUid(uid); // Check if the movie exists
    if (!movie) {
      throw new NotFoundException(`Movie with UID ${uid} not found`);
    }

    await this.movieRepository.delete(uid);
  }

  async searchMovie(name: string) {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.name ILIKE :name', { name: `%${name}%` })
      .orWhere('movie.description ILIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
