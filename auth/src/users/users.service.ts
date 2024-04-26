import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.email && user.email !== updateUserDto.email) {
      const existingUser = await this.usersRepository.findOneBy({
        email: updateUserDto.email,
      });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }
    await this.usersRepository.update(id, updateUserDto);
    Object.assign(user, updateUserDto);
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
