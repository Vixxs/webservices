import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  findAll(movieUid: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { seance: { movie: movieUid } },
    });
  }

  async findOne(uid: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { uid: uid },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation #${uid} not found`);
    }
    return reservation;
  }

  create(
    movieUid: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      seance: { movie: movieUid },
    });
    return this.reservationRepository.save(reservation);
  }

  async confirm(uid: string): Promise<Reservation> {
    const reservation = await this.findOne(uid);
    if (reservation.status === 'pending') {
      reservation.status = 'confirmed';
      await this.reservationRepository.save(reservation);
    }
    return reservation;
  }
}
