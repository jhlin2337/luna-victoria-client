import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app-settings';

@Injectable()
export class UserService {

  readonly BASE_URL = AppSettings.API_ENDPOINT + 'users/';

  constructor(private http: Http) { }

  // Handles user signup
  signup(userData) {
    const url = this.BASE_URL + 'signup';
    return this.http.post(url, userData).map((response: Response) => response.json());
  }

  // Handles user login
  login(userData) {
    const url = this.BASE_URL + 'login';
    return this.http.post(url, userData).map((response: Response) => response.json());
  }

  // Delete user from database
  delete() {
    const url = this.BASE_URL;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem(AppSettings.JWT_TOKEN)}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(url, options).map((response: Response) => response.json());
  }
}
