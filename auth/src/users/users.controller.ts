import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('users/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    if (req.user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Get('users/:id')
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.user.id !== id) {
      throw new UnauthorizedException();
    }
    return this.usersService.findOne(id);
  }
}
