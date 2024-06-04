import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from './cinema/cinema.module';
import { config } from './config/typeorm';
import { AuthGuard } from './guard/auth.guard';
import { jwtConstants } from './guard/constants';
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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
