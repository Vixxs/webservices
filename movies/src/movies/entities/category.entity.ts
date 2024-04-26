import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 256, nullable: true })
  description?: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  movies: Movie[];
}
