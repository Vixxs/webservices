import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceModule } from '../seance/seance.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationConsumer } from './reservation.consumer';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reservation',
    }),
    TypeOrmModule.forFeature([Reservation]),
    SeanceModule,
  ],
  providers: [ReservationService, ReservationConsumer],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
