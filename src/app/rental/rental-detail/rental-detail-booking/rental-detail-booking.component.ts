import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../shared/service/helper.service';
import * as moment from 'moment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() public rental: Rental;

  public daterange: any = {};
  public takenDates: any = [];

  public options: any = {
      locale: { format: 'Y-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left',
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper: HelperService) {}

  private computeTakenDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length) {
      bookings.forEach(booking => {
        const range = this.helper.getRangeOfDates(booking.startAt, booking.endAt);
        range.forEach(date => {

        this.takenDates.push(date)
      });
        this.takenDates.push(moment(booking.startAt).format('Y-MM-DD'));
        this.takenDates.push(moment(booking.startAt).format('Y-MM-DD'));
      });
    }
    this.takenDates;
  }

  private checkForInvalidDates(date) {
    return this.takenDates.includes(date.format('Y-MM-DD')) || date.diff(moment(), 'days', true) <= 0;
  }

  public ngOnInit() {
    this.computeTakenDates();
  }

  public selectedDate(value: any, datepicker?: any) {
      // this is the date the iser selected
      console.log(value);

      // any object can be passed to the selected event and it will be passed back here
      datepicker.start = value.start;
      datepicker.end = value.end;

      // or manupulat your own internal property
      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;
  }
}
