import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RentalComponent } from './rental.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RentalComponent
  ],
  declarations: [
    RentalComponent
  ],
  providers: []
})
export class RentalModule {}
