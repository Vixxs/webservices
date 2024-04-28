import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../entities/category.entity';

export class HalCategoryInterceptor implements NestInterceptor {
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

  private addLinks(category: Category): any {
    const baseUrl = '/api/categories';
    return {
      ...category,
      _links: {
        self: { href: `${baseUrl}/${category.id}` },
        update: { href: `${baseUrl}/${category.id}`, method: 'PUT' },
        delete: { href: `${baseUrl}/${category.id}`, method: 'DELETE' },
        categories: { href: `${baseUrl}/${category.id}/categories` },
      },
    };
  }
}
