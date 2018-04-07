import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) { }

  public getRentals(): Observable<any> {
    return this.http.get('/api/v1/rentals');
  }

  public getRentalById(id: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${id}`);
  }

  public searchRentals(city): Observable<any> {
    return this.http.get(`/api/v1/rentals?city=${city}`);
  }
}
