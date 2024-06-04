import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

export const Roles = Reflector.createDecorator<Role[]>();
