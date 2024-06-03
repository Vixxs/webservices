import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll(cinemaUid: string): Promise<Room[]> {
    return this.roomRepository.find({ where: { cinema: { uid: cinemaUid } } });
  }

  findOne(cinemaUid: string, uid: string): Promise<Room> {
    return this.roomRepository.findOne({ where: { cinema: { uid: cinemaUid }, uid } });
  }

  create(cinemaUid: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create({ ...createRoomDto, cinema: { uid: cinemaUid } });
    return this.roomRepository.save(room);
  }

  async update(cinemaUid: string, uid: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.roomRepository.update(uid, { ...updateRoomDto, cinema: { uid: cinemaUid } });
    return this.findOne(cinemaUid, uid);
  }

  async remove(cinemaUid: string, uid: string): Promise<void> {
    await this.roomRepository.delete(uid);
  }
}
