import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  readonly BASE_URL = 'http://localhost:3000/api/users/';

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
    return this.http.delete(url);
  }
}
