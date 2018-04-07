import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { HelperService } from '../../shared/service/helper.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html'
})
export class RentalSearchComponent implements OnInit {
  public rentals: Rental[];
  public city: string;
  public errors: any;

  constructor(public rentalService: RentalService,
              public helper: HelperService,
              public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.city = params['city'];
      this.getSearchedRentals(params['city']);
    });
  }

  getSearchedRentals(city: string) {
    this.errors = [];

    this.rentalService.searchRentals(city).subscribe(
      rentals => {
        this.rentals = rentals;
      }, (errorsResponse: HttpErrorResponse) => {
        this.rentals = [];
        this.errors = errorsResponse.error.errors;
      });
  }
}
