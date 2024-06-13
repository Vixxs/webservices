import { Seance } from 'src/seance/entities/seance.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => Room, (room: Room) => room.cinema)
  rooms: Room[];

  @OneToMany(() => Seance, (seance) => seance.cinema)
  seances: Seance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
