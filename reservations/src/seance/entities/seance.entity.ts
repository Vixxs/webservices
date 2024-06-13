import { IsUUID } from 'class-validator';
import { Cinema } from 'src/cinema/entities/cinema.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Seance {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @IsUUID()
  movie: string;

  @Column()
  date: Date;

  @ManyToOne(() => Room, (room: Room) => room.seances)
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.seance)
  reservations: Reservation[];

  @ManyToOne(() => Cinema, (cinema: Cinema) => cinema.seances)
  cinema: Cinema;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
