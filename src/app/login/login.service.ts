import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;

  constructor(private http: HttpClient) {
  }

  generateToken(name: string, password: string) {
    return this.http.post<string>(`${environment.apiUrl}/user/token`, { name: name, password: password }, httpOptions).pipe(map(result => {
      this.setToken(result);
      return true;
    }));
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    console.log(date)
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    if (!this.token) {
      return null;
    } else {
      if (this.isTokenExpired(this.token)) {
        this.deleteToken();
        return null;
      }
    }
    return this.token;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.token = null;
  }

}
