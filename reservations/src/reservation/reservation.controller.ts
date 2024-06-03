import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('movies/:movieUid/reservations')
  create(
    @Param('movieUid') movieUid: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.create(movieUid, createReservationDto);
  }

  @Post('reservations/:uid/confirm')
  confirm(@Param('uid') uid: string) {
    return this.reservationService.confirm(uid);
  }

  @Get('movies/:movieUid/reservations')
  findAll(@Param('movieUid') movieUid: string) {
    return this.reservationService.findAll(movieUid);
  }

  @Get('reservations/:uid')
  findOne(@Param('uid') uid: string) {
    return this.reservationService.findOne(uid);
  }
}
