import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';

@Controller('cinema/:cinemaUid/rooms/:roomUid/sceances')
export class SeanceController {
  constructor(private readonly seanceService: SeanceService) {}

  @Get()
  findAll(@Param('roomUid') roomUid: string) {
    return this.seanceService.findAll(roomUid);
  }

  @Get(':uid')
  findOne(@Param('roomUid') roomUid: string, @Param('uid') uid: string) {
    return this.seanceService.findOne(roomUid, uid);
  }

  @Post()
  create(@Param('roomUid') roomUid: string, @Body() createSeanceDto: CreateSeanceDto) {
    return this.seanceService.create(roomUid, createSeanceDto);
  }

  @Put(':uid')
  update(@Param('roomUid') roomUid: string, @Param('uid') uid: string, @Body() updateSeanceDto: UpdateSeanceDto) {
    return this.seanceService.update(roomUid, uid, updateSeanceDto);
  }

  @Delete(':uid')
  remove(@Param('roomUid') roomUid: string, @Param('uid') uid: string) {
    return this.seanceService.remove(roomUid, uid);
  }
}
