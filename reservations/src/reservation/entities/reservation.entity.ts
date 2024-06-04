import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seance } from '../../seance/entities/seance.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @IsUUID()
  userUid: string;

  @Column()
  rank: number;

  @Column()
  status: string;

  @Column()
  nbSeats: number;

  @ManyToOne(() => Seance, (seance) => seance.reservations)
  seance: Seance;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;
}
