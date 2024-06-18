import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guard/roles.guard';
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { SeanceService } from './seance.service';

@Controller('cinema/:cinemaUid/rooms/:roomUid/sceances')
@UseGuards(RolesGuard)
export class SeanceController {
  constructor(private readonly seanceService: SeanceService) {}

  @Get()
  findAll(
    @Param('roomUid') roomUid: string,
    @Param('cinemaUid') cinemaUid: string,
  ) {
    return this.seanceService.findAll(roomUid, cinemaUid);
  }

  @Get(':uid')
  findOne(
    @Param('roomUid') roomUid: string,
    @Param('cinemaUid') cinemaUid: string,
    @Param('uid') uid: string,
  ) {
    return this.seanceService.findOne(roomUid, cinemaUid, uid);
  }

  @Post()
  @Roles([Role.ADMIN])
  create(
    @Param('roomUid') roomUid: string,
    @Param('cinemaUid') cinemaUid: string,
    @Body() createSeanceDto: CreateSeanceDto,
  ) {
    return this.seanceService.create(roomUid, cinemaUid, createSeanceDto);
  }

  @Put(':uid')
  @Roles([Role.ADMIN])
  update(
    @Param('roomUid') roomUid: string,
    @Param('cinemaUid') cinemaUid: string,
    @Param('uid') uid: string,
    @Body() updateSeanceDto: UpdateSeanceDto,
  ) {
    return this.seanceService.update(roomUid, cinemaUid, uid, updateSeanceDto);
  }

  @Delete(':uid')
  @Roles([Role.ADMIN])
  remove(
    @Param('roomUid') roomUid: string,
    @Param('cinemaUid') cinemaUid: string,
    @Param('uid') uid: string,
  ) {
    return this.seanceService.remove(roomUid, cinemaUid, uid);
  }
}
