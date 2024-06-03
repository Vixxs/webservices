import { Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2048, nullable: false })
  description: string;

  @Column({ type: 'boolean', default: false })
  hasReservationsAvailable: boolean;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  @Min(0)
  @Max(5)
  rate: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @Min(0)
  @Max(240)
  duration: number;

  @Column({ nullable: true })
  posterUrl?: string;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'movie_category' })
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
