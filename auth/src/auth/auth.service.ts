import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginOutputDto } from './dto/login-output.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export type UserWithToken = User & { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: registerDto.email,
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    await this.usersRepository.save({
      ...registerDto,
    });
    const registeredUser = await this.usersRepository.findOneBy({
      email: registerDto.email,
    });
    if (!registeredUser) {
      throw new InternalServerErrorException(
        `User with email ${registerDto.email} was not created`,
      );
    }

    return registeredUser;
  }

  async login(loginDto: LoginDto): Promise<LoginOutputDto> {
    const user = await this.usersRepository.findOneBy({
      email: loginDto.email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new BadRequestException('Invalid password');
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async refreshToken(user: User): Promise<LoginOutputDto> {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
