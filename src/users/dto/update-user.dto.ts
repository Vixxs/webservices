import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName?: string | undefined;
  @IsNotEmpty()
  lastName?: string | undefined;
  @IsEmail()
  @IsNotEmpty()
  email?: string | undefined;
}
