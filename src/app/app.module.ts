import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { SharedModule } from './shared/shared.module';
import { RentalModule } from './rental/rental.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RentalComponent } from './rental/rental.component';

import { AuthGuard } from './shared/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

 const routes: Routes = [
   { path: '', redirectTo: '/rentals', pathMatch: 'full' },
   { path: 'rentals', component: RentalComponent },
   { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
   { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
 ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RentalModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SharedModule,
    NgbModule.forRoot()
  ],
  providers: [
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

