import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cinema } from '../../cinema/entities/cinema.entity';
import { Seance } from '../../seance/entities/seance.entity';

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    seats: number;

    @Column()
    name: string;

    @ManyToOne(() => Cinema, (cinema: Cinema) => cinema.rooms)
    cinema: Cinema;

    @OneToMany(() => Seance, (seance: Seance) => seance.room)
    seances: Seance[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}