import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('movie/:movieUid/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Param('movieUid') movieUid: string, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(movieUid, createReservationDto);
  }

  @Post(':uid/confirm')
  confirm(@Param('uid') uid: string) {
    return this.reservationService.confirm(uid);
  }

  @Get()
  findAll(@Param('movieUid') movieUid: string) {
    return this.reservationService.findAll(movieUid);
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.reservationService.findOne(uid);
  }
}
