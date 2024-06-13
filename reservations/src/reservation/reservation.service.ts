import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeanceService } from 'src/seance/seance.service';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Status } from './enums/status.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private seanceService: SeanceService,
    private readonly mailerService: MailerService,
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

  async create(
    movieUid: string,
    createReservationDto: CreateReservationDto,
    userUid: string,
  ): Promise<Reservation> {
    const seance = await this.seanceService.findOneByUidAndRoom(
      createReservationDto.seance,
      movieUid,
    );

    const reservations = await this.reservationRepository.find({
      where: { seance: seance },
    });

    const lastRank = reservations.reduce((acc, cur) => {
      return cur.rank > acc ? cur.rank : acc;
    }, 0);

    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      seance: seance,
      userUid: userUid,
      rank: lastRank + 1,
      // Expires in 15 minutes
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });
    return await this.reservationRepository.save(reservation);
  }

  async confirm(uid: string, user: any): Promise<Reservation> {
    const reservation = await this.findOne(uid);
    if (reservation.status === 'pending') {
      reservation.status = Status.CONFIRMED;
      await this.reservationRepository.save(reservation);
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Nouvelle réservation',
        text: `Votre réservation pour la séance du ${reservation.seance.date} a bien été confirmée.`,
      });
    }
    return reservation;
  }

  async updateStatus(uid: string, status: Status): Promise<Reservation> {
    const reservation = await this.findOne(uid);
    reservation.status = status;
    return await this.reservationRepository.save(reservation);
  }

  async findBySeance(seanceUid: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { seance: { uid: seanceUid } },
    });
  }

  async decreaseRank(uid: string): Promise<Reservation> {
    const reservation = await this.findOne(uid);
    reservation.rank -= 1;
    return await this.reservationRepository.save(reservation);
  }
}
