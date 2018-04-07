import { Rental } from '../../rental/shared/rental.model';
import { User } from '../../user/shared/user.model';

export class Booking {
  _id: string;
  startAt: Date;
  endAt: Date;
  totalPrice: number;
  guests: number;
  days: number;
  createdAt: string;
  rental: Rental;
  user: User;
}
