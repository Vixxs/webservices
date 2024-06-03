import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getAllCategories(query: PaginateQuery): Promise<Paginated<Category>> {
    return await paginate(query, this.categoryRepository, {
      sortableColumns: ['uid'],
      searchableColumns: ['name'],
      defaultLimit: 10,
    });
  }

  async getCategoryByUid(uid: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { uid: uid },
    });
    if (!category) {
      throw new NotFoundException(`Category with UID ${uid} not found`);
    }
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    uid: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryByUid(uid);
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(uid: string): Promise<void> {
    const result = await this.categoryRepository.delete(uid);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with UID ${uid} not found`);
    }
  }

  async getMoviesByCategory(
    uid: string,
    query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.categories', 'category')
      .where('category.uid = :uid', { uid: uid });

    return await paginate(query, queryBuilder, {
      sortableColumns: ['uid'],
      defaultLimit: 10,
    });
  }
}
