import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app-settings';

@Injectable()
export class UserService {

  readonly BASE_URL = AppSettings.API_ENDPOINT + 'users/';
  userId;

  constructor(private router: Router, private http: Http) { }

  // Handles user signup
  signup(userData) {
    const url = this.BASE_URL + 'signup';
    return this.http.post(url, userData).map((response: Response) => response.json());
  }

  // Handles user login
  login(userData) {
    const url = this.BASE_URL + 'login';
    this.http.post(url, userData)
      .map((response: Response) => response.json())
      // Store jwt token that we received from the backend if the login is successful
      .subscribe((data: any) => {
          localStorage.setItem(data.userId, data.token);
          this.router.navigate(['/planner']);
          this.userId = data.userId;
        },
        // Alert the user if authentication failed
        (error) => {
          alert('Authentication Failed. Incorrect email or password');
        }
      );
  }

  // Delete user from database
  delete() {
    const url = this.BASE_URL;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem(this.userId)}`);
    const options = new RequestOptions({ headers: headers });

    localStorage.removeItem(this.userId);
    this.userId = null;
    this.router.navigate(['/']);

    return this.http.delete(url, options).map((response: Response) => response.json());
  }

  getToken() {
    return localStorage.getItem(this.userId);
  }

  // Log user out by redirecting them to home page and clearing his/her jwt token
  logout() {
    localStorage.removeItem(this.userId);
    this.userId = null;
    this.router.navigate(['/']);
  }
}
