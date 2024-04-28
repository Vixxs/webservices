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

  @Get(':id')
  @UseInterceptors(HalCategoryInterceptor)
  async getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
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

  @Put(':id')
  @UseInterceptors(HalCategoryInterceptor)
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseInterceptors(HalCategoryInterceptor)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }

  @Get(':id/movies')
  async getMoviesByCategory(@Param('id') id: number): Promise<Movie[]> {
    return await this.categoryService.getMoviesByCategory(id);
  }
}
