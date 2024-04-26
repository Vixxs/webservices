import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { log } from 'console';
import { Role } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { Roles } from './decorator/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { AccountDto } from './dto/register.dto';

@SkipThrottle()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('account')
  @Roles(Role.ADMIN)
  register(@Body() accountDto: AccountDto) {
    return this.authService.createAccount(accountDto);
  }

  @Get('account/:uid')
  getAccount(@Param('uid') uid: string, @Request() req: any) {
    const id = uid === 'me' ? req.user.id : uid;
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(
        "Il est nécessaire d'être administrateur ou d'être le proprétaire du compte",
      );
    }
    return this.usersService.findOne(id);
  }

  @Put('account/:uid')
  updateAccount(
    @Param('uid') uid: string,
    @Body() accountDto: AccountDto,
    @Request() req: any,
  ) {
    const id = uid === 'me' ? req.user.id : uid;
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException(
        "Il est nécessaire d'être administrateur ou d'être le proprétaire du compte",
      );
    }
    return this.usersService.update(id, accountDto);
  }

  @Public()
  @Post('token')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh-token/:refreshToken/token')
  refreshToken(@Param('refreshToken') refreshToken: string) {
    log(refreshToken);
    return this.authService.refreshToken(refreshToken);
  }

  @Public()
  @Get('validate/:accessToken')
  validate(@Param('accessToken') accessToken: string) {
    return this.authService.validate(accessToken);
  }
}
