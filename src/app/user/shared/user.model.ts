import { Rental } from '../../rental/shared/rental.model';
import { Booking } from '../../booking/shared/booking.model';

export interface User {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  bookings: Booking[];
  rentals: Rental[];
}

export function userFactory(username?: string,
                            email?: string,
                            password?: string,
                            passwordConfirmation?:string,
                            rentals?:Rental[],
                            bookings?:Booking[] ): User {
  return {
    username,
    email,
    password,
    passwordConfirmation,
    rentals,
    bookings
  }
}
