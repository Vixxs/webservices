import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { Cinema } from './entities/cinema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cinema])],
  providers: [CinemaService],
  controllers: [CinemaController],
})
export class CinemaModule {}