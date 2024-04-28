import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../entities/movie.entity';

export class HalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          // If data is an array (e.g., a list of movies), add links to each item
          return data.map((item) => this.addLinks(item));
        } else {
          // If data is a single object, add links to it
          return this.addLinks(data);
        }
      }),
    );
  }

  private addLinks(movie: Movie): any {
    const baseUrl = '/api/movies';
    return {
      ...movie,
      _links: {
        self: { href: `${baseUrl}/${movie.id}` },
        update: { href: `${baseUrl}/${movie.id}`, method: 'PUT' },
        delete: { href: `${baseUrl}/${movie.id}`, method: 'DELETE' },
      },
    };
  }
}
