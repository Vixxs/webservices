import { IsNumber, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  seance: string;
  @IsNumber()
  nbSeats: number;
  @IsUUID()
  room: string;
}
