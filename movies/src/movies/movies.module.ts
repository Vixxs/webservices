import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MovieController } from './movies.controller';
import { MovieService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';

@Module({
  imports: [
    HttpModule,
    MoviesModule,
    TypeOrmModule.forFeature([Movie, Category]),
  ],
  controllers: [MovieController, CategoryController],
  providers: [MovieService, CategoryService],
})
export class MoviesModule {}
