import { Booking } from '../../booking/shared/booking.model';
import { User } from '../../user/shared/user.model';

export class Rental {
  public static readonly CATEGORIES = ['apartment', 'house', 'condo']

  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  createdAt: string;
  bookings: Booking[];
  user: User;
}
