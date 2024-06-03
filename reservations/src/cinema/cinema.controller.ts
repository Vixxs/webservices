import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.cinemaService.findOne(uid);
  }

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Put(':uid')
  update(@Param('uid') uid: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(uid, updateCinemaDto);
  }

  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.cinemaService.remove(uid);
  }
}
