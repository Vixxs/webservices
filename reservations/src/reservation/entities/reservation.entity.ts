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
import { Status } from '../enums/status.enum';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  @IsUUID()
  userUid: string;

  @Column()
  rank: number;

  @Column({ type: 'varchar', enum: Status, default: Status.PENDING })
  private _status: Status;

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

  get status(): Status {
    if (this.expiresAt < new Date()) {
      return Status.EXPIRED;
    }
    return this._status;
  }

  set status(status: Status) {
    this._status = status;
  }
}
