import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forRoot({
      ...config,
    }),
    HttpModule,
    MoviesModule,
    ConfigModule,
  ],
})
export class AppModule {}
