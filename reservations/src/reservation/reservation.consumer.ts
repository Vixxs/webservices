import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Reservation } from './entities/reservation.entity';
import { Status } from './enums/status.enum';
import { ReservationService } from './reservation.service';

@Processor('reservation')
export class ReservationConsumer {
  constructor(private reservationService: ReservationService) {}

  @Process()
  async process(job: Job<Reservation>) {
    const reservation = job.data;
    // Update the reservation status
    await this.reservationService.updateStatus(reservation.uid, Status.OPEN); // replace 'newStatus' with the actual status

    const otherReservations = await this.reservationService.findBySeance(
      reservation.seance.uid,
    );

    // Decrease the rank of all reservations PENDING
    otherReservations.forEach(async (otherReservation) => {
      if (otherReservation.status === Status.PENDING) {
        await this.reservationService.decreaseRank(otherReservation.uid);
      }
    });
  }
}
