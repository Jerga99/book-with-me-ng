import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageComponent } from './manage.component';

import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'rentals', component: ManageRentalsComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [],
  declarations: [
    ManageComponent,
    ManageRentalsComponent
  ],
  providers: [RentalService, BookingService]
})
export class ManageModule {}
