import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../shared/rental.service';
import { HelperService } from '../../../shared/service/helper.service';

import { Rental } from '../../shared/rental.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rental-detail-update',
  templateUrl: './rental-detail-update.component.html',
  styleUrls: ['./rental-detail-update.component.scss']
})
export class RentalDetailUpdateComponent implements OnInit {

  public rental: Rental;

  public locationChanged$: Subject<any>;

  constructor(public rentalService: RentalService,
              public route: ActivatedRoute,
              public helper: HelperService) {}

  ngOnInit() {
    this.locationChanged$ = new Subject();

    this.route.params.subscribe(params => {
      this.getRentalById(params['rentalId']);
    });
  }

  getRentalById(id: string) {
    this.rentalService.getRentalById(id).subscribe((rental) => {
      this.rental = rental;
    })
  }

  parseInt(value) {
    return parseInt(value);
  }

  updateRental(id, rentalData) {
    this.rentalService.updateRental(id, rentalData).subscribe((rental) => {
      this.rental = rental;
      if (rentalData.city || rentalData.street) {
        this.locationChanged$.next(rental.city + ', ' + rental.street);
      }
    })
  }
}
