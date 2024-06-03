import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  findAll(cinemaUid: string): Promise<Room[]> {
    return this.roomRepository.find({ where: { cinema: { uid: cinemaUid } } });
  }

  async findOne(cinemaUid: string, uid: string): Promise<Room> {
    const cinema = await this.roomRepository.findOne({
      where: { cinema: { uid: cinemaUid }, uid },
    });
    if (!cinema) {
      throw new NotFoundException(`Room #${uid} not found`);
    }
    return cinema;
  }

  create(cinemaUid: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create({
      ...createRoomDto,
      cinema: { uid: cinemaUid },
    });
    return this.roomRepository.save(room);
  }

  async update(
    cinemaUid: string,
    uid: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    await this.roomRepository.update(uid, {
      ...updateRoomDto,
      cinema: { uid: cinemaUid },
    });
    return this.findOne(cinemaUid, uid);
  }

  async remove(cinemaUid: string, uid: string): Promise<void> {
    await this.roomRepository.delete(uid);
  }
}
