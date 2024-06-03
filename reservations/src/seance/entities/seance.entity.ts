import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity()
export class Seance {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  movie: string;

  @Column()
  date: Date;

  @ManyToOne(() => Room, (room: Room) => room.seances)
  room: Room;

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.seance)
  reservations: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}