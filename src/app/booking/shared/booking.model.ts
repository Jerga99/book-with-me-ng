import { Rental } from '../../rental/shared/rental.model';
import { User } from '../../user/shared/user.model';

export class Booking {
  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  guests: number;
  days: number;
  createdAt: string;
  rental: Rental;
  user: User;
}
