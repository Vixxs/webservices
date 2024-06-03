import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { config } from './config/typeorm';
import { ReservationModule } from './reservation/reservation.module';
import { RoomModule } from './room/room.module';
import { SeanceModule } from './seance/seance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    CinemaModule,
    RoomModule,
    SeanceModule,
    ReservationModule,
  ],
})
export class AppModule {}
