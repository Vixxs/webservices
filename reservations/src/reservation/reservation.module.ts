import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceModule } from 'src/seance/seance.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationConsumer } from './reservation.consumer';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'reservation',
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    BullBoardModule.forFeature({
      name: 'reservation',
      adapter: BullAdapter,
    }),
    SeanceModule,
    TypeOrmModule.forFeature([Reservation]),
  ],
  providers: [ReservationService, ReservationConsumer],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
