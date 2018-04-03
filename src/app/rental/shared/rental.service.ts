import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { JsonApiModel } from 'angular2-jsonapi';
import { Datastore } from '../../shared/datastore';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {

  constructor(private datastore: Datastore) { }

  public getDatastore(): Datastore {
    return this.datastore;
  }

  public getRentals(): Observable<JsonApiModel[]> {
    return this.datastore.query(Rental);
  }

  public getRentalById(id: string): Observable<Rental> {
    return this.datastore.findRecord(Rental, id);
  }
}
