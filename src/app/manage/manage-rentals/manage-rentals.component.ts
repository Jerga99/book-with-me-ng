import { Component, OnInit } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { RentalService } from '../../rental/shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {
  public rentals: Rental[];
  public errors: any;

  constructor(private rentalService: RentalService){}

  ngOnInit() {
    this.rentalService.getCurrentUserRentals().subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }

}
