import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller()
@UseGuards(RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('movies/:movieUid/reservations')
  create(
    @Param('movieUid') movieUid: string,
    @Body() createReservationDto: CreateReservationDto,
    @Request() req: any,
  ) {
    return this.reservationService.create(
      movieUid,
      createReservationDto,
      req.user.uid,
    );
  }

  @Post('reservations/:uid/confirm')
  confirm(@Param('uid') uid: string) {
    return this.reservationService.confirm(uid);
  }

  @Get('movies/:movieUid/reservations')
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
