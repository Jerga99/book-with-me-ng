import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

import { RentalService } from './shared/rental.service';

import { Daterangepicker } from 'ng2-daterangepicker';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Daterangepicker
  ],
  exports: [
    RentalComponent,
    RentalListComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent
  ],
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent
  ],
  providers: [RentalService]
})
export class RentalModule {}
