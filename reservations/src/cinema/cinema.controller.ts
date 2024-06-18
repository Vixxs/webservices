import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
@UseGuards(RolesGuard)
export class CinemaController {
  constructor(
    @Inject(forwardRef(() => CinemaService))
    private readonly cinemaService: CinemaService,
  ) {}

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.cinemaService.findOne(uid);
  }

  @Post()
  @Roles([Role.ADMIN])
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Put(':uid')
  @Roles([Role.ADMIN])
  update(@Param('uid') uid: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(uid, updateCinemaDto);
  }

  @Delete(':uid')
  @Roles([Role.ADMIN])
  remove(@Param('uid') uid: string) {
    return this.cinemaService.remove(uid);
  }
}
