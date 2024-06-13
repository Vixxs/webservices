import { IsDate, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { Status } from '../enums/status.enum';

export class OutputReservationDto {
  @IsUUID()
  uid: string;
  @IsNumber()
  rank: number;
  @IsEnum(Status)
  status: Status;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
  @IsDate()
  expiresAt?: Date;
}
