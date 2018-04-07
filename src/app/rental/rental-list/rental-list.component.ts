import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';

import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  public rentals: Rental[];

  constructor(public rentalService: RentalService) {}

  ngOnInit() {
    this.rentalService.getRentals().subscribe((rentals: Rental[]) => {
      this.rentals = rentals;
    });
  }
}
