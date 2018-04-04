import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { RentalModule } from './rental/rental.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { RentalComponent } from './rental/rental.component';

import { HelperService } from './shared/service/helper.service';

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
    RentalModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

