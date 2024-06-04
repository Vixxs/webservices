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
import { Role } from '../decorator/role.enum';
import { Roles } from '../decorator/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('cinema/:cinemaUid/rooms')
@UseGuards(Roles)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(@Param('cinemaUid') cinemaUid: string) {
    return this.roomService.findAll(cinemaUid);
  }

  @Get(':uid')
  findOne(@Param('cinemaUid') cinemaUid: string, @Param('uid') uid: string) {
    return this.roomService.findOne(cinemaUid, uid);
  }

  @Post()
  @Roles([Role.ADMIN])
  create(
    @Param('cinemaUid') cinemaUid: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create(cinemaUid, createRoomDto);
  }

  @Put(':uid')
  @Roles([Role.ADMIN])
  update(
    @Param('cinemaUid') cinemaUid: string,
    @Param('uid') uid: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(cinemaUid, uid, updateRoomDto);
  }

  @Delete(':uid')
  @Roles([Role.ADMIN])
  remove(@Param('cinemaUid') cinemaUid: string, @Param('uid') uid: string) {
    return this.roomService.remove(cinemaUid, uid);
  }
}
