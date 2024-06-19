import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Queue } from 'bull';
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { OutputReservationDto } from './dto/output-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller()
@UseGuards(RolesGuard)
export class ReservationController {
  constructor(
    @InjectQueue('reservation')
    private reservationsQueue: Queue,
    private readonly reservationService: ReservationService,
  ) {}

  @Post('movie/:movieUid/reservations')
  async create(
    @Param('movieUid') movieUid: string,
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ): Promise<OutputReservationDto> {
    const reservation = await this.reservationService.create(
      createReservationDto,
      req.user.uid,
    );
    if (!reservation) {
      throw new InternalServerErrorException(
        'Error while creating reservation',
      );
    }
    await this.reservationsQueue.add(reservation);
    return {
      uid: reservation.uid,
      rank: reservation.rank,
      status: reservation.status,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
      expiresAt: reservation.expiresAt,
    };
  }

  @Post('reservations/:uid/confirm')
  confirm(@Param('uid') uid: string, @Request() req: any) {
    const user = req.user;
    return this.reservationService.confirm(uid, user);
  }

  @Get('movie/:movieUid/reservations')
  @Roles([Role.ADMIN])
  findAll(@Param('movieUid') movieUid: string) {
    return this.reservationService.findAll(movieUid);
  }

  @Get('reservations/:uid')
  async findOne(@Param('uid') uid: string, @Request() req: any) {
    const reservation = await this.reservationService.findOne(uid);
    if (
      req.user.roles.includes(Role.ADMIN) ||
      req.user.uid === reservation.userUid
    ) {
      return reservation;
    }
  }
}
