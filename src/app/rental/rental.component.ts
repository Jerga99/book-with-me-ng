import { Component } from '@angular/core';
import { Datastore } from '../shared/datastore';

import { Rental } from './shared/rental.model';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Component({
  selector: 'app-root',
  templateUrl: './rental.component.html'
})
export class RentalComponent {
  public rentals: Rental[];

  constructor(datastore: Datastore) {
    datastore.findAll(Rental).subscribe((rentals: JsonApiQueryData<Rental>) => {

      this.rentals = rentals.getModels();
    });
  }
}
