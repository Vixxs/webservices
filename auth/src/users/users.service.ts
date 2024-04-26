import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/accounts/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async update(uid: string, updateUserDto: AccountDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      uid: uid,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.roles.includes(Role.ADMIN)) {
      updateUserDto.roles = user.roles;
    }

    return this.usersRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      uid: uid,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
