import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Rental } from '../../rental/shared/rental.model';
import { RentalService } from '../../rental/shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'bwm-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {
  public rentals: Rental[];
  public errors: any;

  constructor(private rentalService: RentalService,
              public toastr: ToastsManager
              public vcr: ViewContainerRef,){

    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.rentalService.getCurrentUserRentals().subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }

  removeRentalFromView(rentalId: string) {
    const index = this.rentals.findIndex(rental => rental._id == rentalId);
    this.rentals.splice(index, 1);
  }

  deleteRental(rental): any {
    this.rentalService.deleteById(rental._id).subscribe(
      () => {
        this.removeRentalFromView(rental._id);
      },
      (errorsResponse: HttpErrorResponse) => {
        this.toastr.error(errorsResponse.error.errors[0].detail, 'Failed!');
      });
  }
}
