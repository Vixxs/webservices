import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seance } from './entities/seance.entity';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';

@Injectable()
export class SeanceService {
  constructor(
    @InjectRepository(Seance)
    private seanceRepository: Repository<Seance>,
  ) {}

  findAll(roomUid: string): Promise<Seance[]> {
    return this.seanceRepository.find({ where: { room: { uid: roomUid } } });
  }

  async findOne(roomUid: string, uid: string): Promise<Seance> {
    const seance = await this.seanceRepository.findOne({ where: { room: { uid: roomUid }, uid } });
    if (!seance) {
      throw new NotFoundException(`Seance #${uid} not found`);
    }
    return seance;
  }

  create(roomUid: string, createSeanceDto: CreateSeanceDto): Promise<Seance> {
    const seance = this.seanceRepository.create({ ...createSeanceDto, room: { uid: roomUid } });
    return this.seanceRepository.save(seance);
  }

  async update(roomUid: string, uid: string, updateSeanceDto: UpdateSeanceDto): Promise<Seance> {
    await this.seanceRepository.update(uid, { ...updateSeanceDto, room: { uid: roomUid } });
    return this.findOne(roomUid, uid);
  }

  async remove(roomUid: string, uid: string): Promise<void> {
    await this.seanceRepository.delete(uid);
  }
}
