import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Cinema {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column()
    name: string;

    @OneToMany(() => Room, (room: Room) => room.cinema)
    rooms: Room[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}