import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CategoryService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { Movie } from './entities/movie.entity';
import { HalCategoryInterceptor } from './interceptors/hal.category.interceptor';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Category>> {
    return await this.categoryService.getAllCategories(query);
  }

  @Get(':uid')
  @UseInterceptors(HalCategoryInterceptor)
  async getCategoryByUid(@Param('uid') uid: string): Promise<Category> {
    const category = await this.categoryService.getCategoryByUid(uid);
    if (!category) {
      throw new NotFoundException(`Category with UID ${uid} not found`);
    }
    return category;
  }

  @Post()
  @UseInterceptors(HalCategoryInterceptor)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':uid')
  @UseInterceptors(HalCategoryInterceptor)
  async updateCategory(
    @Param('uid') uid: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(uid, updateCategoryDto);
  }

  @Delete(':uid')
  @UseInterceptors(HalCategoryInterceptor)
  async deleteCategory(@Param('uid') uid: string): Promise<void> {
    await this.categoryService.deleteCategory(uid);
  }

  @Get(':uid/movies')
  async getMoviesByCategory(
    @Param('uid') uid: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Movie>> {
    return await this.categoryService.getMoviesByCategory(uid, query);
  }
}
