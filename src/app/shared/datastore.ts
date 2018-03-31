import { JsonApiDatastoreConfig, JsonApiDatastore, DatastoreConfig } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Rental } from '../rental/shared/rental.model';

const config: DatastoreConfig = {
  baseUrl: '/api/v1',
  models: {
    rentals: Rental
  }
}

@Injectable()
@JsonApiDatastoreConfig(config)
export class Datastore extends JsonApiDatastore {

  constructor(http: Http) {
    super(http);
  }
}
