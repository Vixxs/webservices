import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaModule } from '../cinema/cinema.module';
import { RoomModule } from '../room/room.module';
import { Seance } from './entities/seance.entity';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seance]), CinemaModule, RoomModule],
  providers: [SeanceService],
  controllers: [SeanceController],
  exports: [SeanceService],
})
export class SeanceModule {}
