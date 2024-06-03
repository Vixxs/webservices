import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './reservation/cinema.module';
import { RoomModule } from './room/room.module';
import { SeanceModule } from './seance/seance.module';
import { ReservationModule } from './reservation/reservation.module';
import { Cinema } from './cinema/cinema.entity';
import { Room } from './room/room.entity';
import { Seance } from './seance/seance.entity';
import { Reservation } from './reservation/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cinema.db',
      entities: [Cinema, Room, Seance, Reservation],
      synchronize: true,
    }),
    CinemaModule,
    RoomModule,
    SeanceModule,
    ReservationModule,
  ],
})
export class AppModule {}
