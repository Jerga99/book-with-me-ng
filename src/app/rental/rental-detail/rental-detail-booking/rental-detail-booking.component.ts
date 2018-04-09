import { Component, ViewEncapsulation, Input, OnInit, ViewChild } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../shared/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() public rental: Rental;
  @ViewChild(DaterangePickerComponent)
  public picker: DaterangePickerComponent;

  public daterange: any = {};
  public takenDates: any = [];
  public newBooking: Booking;
  public modalRef: any;

  public options: any = {
      locale: { format: 'Y-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left',
      isInvalidDate: this.checkForInvalidDates.bind(this),
      autoUpdateInput: false
  };

  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService) {}

  private computeTakenDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length) {
      bookings.forEach(booking => {
        this.fillTakenDates(booking.startAt, booking.endAt);
      });
    }
    this.takenDates;
  }

  private fillTakenDates(startAt, endAt) {
    const range = this.helper.getRangeOfDates(startAt, endAt);

    range.forEach(date => {
      this.takenDates.push(date)
    });
    this.takenDates.push(moment(startAt).format('Y-MM-DD'));
    this.takenDates.push(moment(endAt).format('Y-MM-DD'));
  }

  private checkForInvalidDates(date) {
    return this.takenDates.includes(date.format('Y-MM-DD')) || date.diff(moment(), 'days', true) <= 0;
  }

  private computeBookingValues() {
    this.newBooking.days = this.helper.getRangeOfDates(this.newBooking.startAt, this.newBooking.endAt).length;
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
    this.newBooking.rental = this.rental;
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(new Date());
    this.picker.datePicker.setEndDate(new Date());
    this.picker.datePicker.element.val('');
  }

  public ngOnInit() {
    this.computeTakenDates();
    this.newBooking = new Booking();
  }

  public selectedDate(value: any, datepicker?: any) {
    this.newBooking.startAt = moment(value.start).format('Y-MM-DD');
    this.newBooking.endAt = moment(value.end).format('Y-MM-DD');
    this.computeBookingValues();
    this.options.autoUpdateInput = true;
  }

  public confirmBooking(bookingModal) {
    this.bookingService.makeBooking(this.newBooking).subscribe(data => {
      this.newBooking = new Booking();
      this.fillTakenDates(data.startAt, data.endAt);
      this.resetDatepicker();
      this.modalRef.close();
    }, (errorsResponse) => {

    });
  }

  public openModal(content) {
    this.modalRef = this.modalService.open(content);
  }

}
