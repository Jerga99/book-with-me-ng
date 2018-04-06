import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

export interface LoginData {
  email: string,
  password: string,
}

@Injectable()
export class UserService {
  private isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem('bwm_auth');
  }

  public register(user: User): Observable<any> {
    return this.http.post('/api/v1/users', user);
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post('/api/v1/auth', loginData).map(token => this.saveToken(token));
  }

  private saveToken(token) {
    localStorage.setItem('bwm_auth', JSON.stringify(token));

    return token;
  }

 isAuthenticated(): boolean {
    // Check if token is not expired
    debugger;
    return this.isLoggedIn;
  }
}
