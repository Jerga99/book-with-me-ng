import { Component, Input } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bwm-manage-rentals-booking',
  templateUrl: './manage-rentals-booking.component.html',
  styleUrls: ['./manage-rentals-booking.component.scss']
})
export class ManageRentalsBookingComponent {
  @Input() public bookings: Booking[];

  constructor(public modalService: NgbModal){}
}
