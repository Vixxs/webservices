import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CinemaService } from '../cinema/cinema.service';
import { RoomService } from '../room/room.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { Seance } from './entities/seance.entity';

@Injectable()
export class SeanceService {
  constructor(
    @InjectRepository(Seance)
    private seanceRepository: Repository<Seance>,
    private cinemaService: CinemaService,
    private roomService: RoomService,
  ) {}

  findAll(roomUid: string, cinemaUid: string): Promise<Seance[]> {
    return this.seanceRepository.find({
      where: { room: { uid: roomUid }, cinema: { uid: cinemaUid } },
    });
  }

  async findOneByUidAndRoom(uid: string, roomUid: string): Promise<Seance> {
    const seance = await this.seanceRepository.findOne({
      where: {
        uid: uid,
        room: { uid: roomUid },
      },
    });
    if (!seance) {
      throw new NotFoundException(`Seance #${uid} not found`);
    }
    return seance;
  }

  async findOne(
    roomUid: string,
    cinemaUid: string,
    uid: string,
  ): Promise<Seance> {
    const seance = await this.seanceRepository.findOne({
      where: { room: { uid: roomUid }, cinema: { uid: cinemaUid }, uid: uid },
    });
    if (!seance) {
      throw new NotFoundException(`Seance #${uid} not found`);
    }
    return seance;
  }

  async create(
    roomUid: string,
    cinemaUid: string,
    createSeanceDto: CreateSeanceDto,
  ): Promise<Seance> {
    const cinema = await this.cinemaService.findOne(cinemaUid);
    const room = await this.roomService.findOne(cinemaUid, roomUid);
    const seance = this.seanceRepository.create({
      ...createSeanceDto,
      cinema: cinema,
      room: room,
    });
    return this.seanceRepository.save(seance);
  }

  async update(
    roomUid: string,
    cinemaUid: string,
    uid: string,
    updateSeanceDto: UpdateSeanceDto,
  ): Promise<Seance> {
    const seance = await this.findOne(roomUid, cinemaUid, uid);
    return this.seanceRepository.save({
      ...seance,
      ...updateSeanceDto,
    });
  }

  async remove(roomUid: string, cinemaUid: string, uid: string): Promise<void> {
    const seance = await this.findOne(roomUid, cinemaUid, uid);
    await this.seanceRepository.remove(seance);
  }
}
