import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('cinema/:cinemaUid/rooms')
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
  create(@Param('cinemaUid') cinemaUid: string, @Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(cinemaUid, createRoomDto);
  }

  @Put(':uid')
  update(@Param('cinemaUid') cinemaUid: string, @Param('uid') uid: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(cinemaUid, uid, updateRoomDto);
  }

  @Delete(':uid')
  remove(@Param('cinemaUid') cinemaUid: string, @Param('uid') uid: string) {
    return this.roomService.remove(cinemaUid, uid);
  }
}
