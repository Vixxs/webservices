import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cinema } from './entities/cinema.entity';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private cinemaRepository: Repository<Cinema>,
  ) {}

  findAll(): Promise<Cinema[]> {
    return this.cinemaRepository.find();
  }

  findOne(uid: string): Promise<Cinema> {
    return this.cinemaRepository.findOne(uid);
  }

  create(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const cinema = this.cinemaRepository.create(createCinemaDto);
    return this.cinemaRepository.save(cinema);
  }

  async update(uid: string, updateCinemaDto: UpdateCinemaDto): Promise<Cinema> {
    await this.cinemaRepository.update(uid, updateCinemaDto);
    return this.findOne(uid);
  }

  async remove(uid: string): Promise<void> {
    await this.cinemaRepository.delete(uid);
  }
}