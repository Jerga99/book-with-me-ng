import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'bwm-rental-create-component',
  templateUrl: './rental-create.component.html'
})
export class RentalCreateComponent implements OnInit {
  public newRental: Rental;
  public errors: any = [];
  public rentalCategories = Rental.CATEGORIES;

  constructor(private rentalService: RentalService,
              private router: Router) {}

  fileChangeEvent() {
    this.newRental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }

  ngOnInit() {
    this.newRental = new Rental();
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      () => {
        this.router.navigate(['/rentals']);
      }, (errorsResponse: HttpErrorResponse) => {
        this.errors = errorsResponse.error.errors;
      });
  }
}
