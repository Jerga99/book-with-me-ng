import { Component } from '@angular/core';
import { Datastore } from '../shared/datastore';

import { Rental } from './shared/rental.model';

@Component({
  selector: 'app-root',
  templateUrl: './rental.component.html'
})
export class RentalComponent {
  public rental: Rental;

  constructor(datastore: Datastore) {
    this.rental = datastore.createRecord(Rental, {
       title: 'Some nice apartment',
       city: 'New York',
       street: 'Time Square',
       category: 'Apartment',
       image: 'http://via.placeholder.com/350x250',
       bedrooms: 5,
       description: 'Very nice cozy apartment',
       daily_rate: 20,
       created_at: '20/4/2018'
    });
  }
}
