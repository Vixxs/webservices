import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  title: string;

  @Column({ length: 2048 })
  description: string;

  @Column()
  releaseDate: Date;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @Column({ nullable: true })
  posterUrl?: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
