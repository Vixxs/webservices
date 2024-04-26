import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/typeorm';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

export class ConfigSearch {
  public static searchConfig(url: string): any {
    return {
      node: url,
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true,
    };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      ...config,
    }),
    HttpModule,
    MoviesModule,
    ConfigModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
