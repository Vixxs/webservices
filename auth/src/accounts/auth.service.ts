import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AccessTokenDto } from './dto/accessToken.dto';
import { LoginDto } from './dto/login.dto';
import { AccountDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

export type UserWithToken = User & { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createAccount(accountDto: AccountDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      login: accountDto.login,
    });
    if (user) {
      throw new BadRequestException('User with this login already exists');
    }
    accountDto.password = await bcrypt.hash(accountDto.password, 10);
    return this.usersRepository.save({
      ...accountDto,
    });
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.usersRepository.findOneBy({
      login: loginDto.login,
    });
    if (!user) {
      throw new NotFoundException(
        'Identifiant non trouvé (paire login / mot de passe inconnue',
      );
    }
    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new NotFoundException(
        'Identifiant non trouvé (paire login / mot de passe inconnue',
      );
    }

    const accessToken = this.jwtService.sign({
      id: user.uid,
      email: user.login,
    });
    const newRefreshToken = this.jwtService.sign(
      {
        uid: user.uid,
        login: user.login,
      },
      {
        expiresIn: '120m',
      },
    );
    return {
      accessToken: accessToken,
      accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 120 * 60 * 1000),
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenDto> {
    try {
      await this.jwtService.verifyAsync(refreshToken);
    } catch (e) {
      throw new NotFoundException('Token invalide ou inexistant');
    }
    const payload = this.jwtService.decode(refreshToken);

    const accessToken = this.jwtService.sign({
      id: payload.uid,
      email: payload.login,
    });
    const newRefreshToken = this.jwtService.sign(
      {
        uid: payload.uid,
        login: payload.login,
      },
      {
        expiresIn: '120m',
      },
    );
    return {
      accessToken: accessToken,
      accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 120 * 60 * 1000),
    };
  }

  async validate(accessToken: string): Promise<AccessTokenDto> {
    if (!this.jwtService.verify(accessToken)) {
      throw new NotFoundException('Token invalide ou inexistant');
    }
    const payload = this.jwtService.decode(accessToken);

    return {
      accessToken: accessToken,
      accessTokenExpiresAt: payload.exp,
    };
  }
}
