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
  private cachedUsername: string;
  private cachedToken: string;

  constructor(private http: HttpClient) {}

  private saveToken(token) {
    localStorage.setItem('bwm_auth', JSON.stringify(token));

    return token;
  }

  private parseJwt (token) {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');

      return JSON.parse(window.atob(base64));
    }

    return {};
  }

  private getToken(): string {
    if (this.cachedToken) return this.cachedToken;

    if (this.isAuthenticated()) {
      return this.cachedToken = JSON.parse(localStorage.getItem('bwm_auth')).token;
    }

    return '';
  }


  public register(user: User): Observable<any> {
    return this.http.post('/api/v1/users', user);
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post('/api/v1/auth', loginData).map(token => this.saveToken(token));
  }

  public isAuthenticated(): boolean {
    // Check if token is not expired
    return !!localStorage.getItem('bwm_auth');
  }

  public logout(): Observable<any> {
    localStorage.removeItem('bwm_auth');

    return new Observable(observer => {
      if (!!localStorage.getItem('bwm_auth')) {
        observer.error(new Error("Token not removed"));
      } else {
        observer.next();
      }
    });
  }

  public getUsername(): string {
    if (this.cachedUsername) return this.cachedUsername;

    return this.cachedUsername = this.parseJwt(this.getToken()).username;
  }

  public getAuthToken(): any {
    const auth = localStorage.getItem('bwm_auth');

    return auth ? `Bearer ${JSON.parse(auth).token}` : '';
  }
}
