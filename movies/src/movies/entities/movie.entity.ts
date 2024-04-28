import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  title: string;

  @Column({ type: 'varchar', length: 2048 })
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @Column({ nullable: true })
  posterUrl?: string;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'movie_category' })
  categories: Category[];
}
