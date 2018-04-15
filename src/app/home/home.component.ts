import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signupInvalid: boolean;
  signupSuccessful: boolean;
  signupEmailExists: boolean;

  constructor(private userService: UserService) {
    this.signupInvalid = false;
    this.signupSuccessful = false;
    this.signupEmailExists = false;
  }

  ngOnInit() { }

  // Communicate with backend to log user in
  login(loginForm) {
    // Do nothing if form is invalid
    if (loginForm.invalid) {
      alert('Email or Password Invalid');
      return;
    }

    // Make login request to backend
    this.userService.login(loginForm.value)
      .subscribe((data: any) => {
        localStorage.setItem(AppSettings.JWT_TOKEN, data.token);
      },
      (error) => {
        alert('Authentication Failed. Incorrect email or password');
      }
    );
  }

  // Communicate with backend to sign user up
  signup(signupForm) {
    // Do nothing if form is invalid
    if (signupForm.invalid) {
      this.signupInvalid = true;
      return;
    }

    // Adjust UI display
    this.signupInvalid = false;
    this.signupSuccessful = false;
    this.signupEmailExists = false;

    // Make signup request to backend
    this.userService.signup(signupForm.value)
      .subscribe((data: any) => {
        this.signupSuccessful = true;
      },
      (error) => {
        this.signupEmailExists = true;
      }
    );
  }
}
