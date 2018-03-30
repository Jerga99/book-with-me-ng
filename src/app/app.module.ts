import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';
import { Routes, RouterModule } from '@angular/router';

import { RentalModule } from './rental/rental.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header.component';
import { RentalComponent } from './rental/rental.component';

 const routes: Routes = [
   { path: '', redirectTo: '/rentals', pathMatch: 'full' },
   { path: 'rentals', component: RentalComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    JsonApiModule,
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

