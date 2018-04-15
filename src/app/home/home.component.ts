import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signupInvalid: boolean;

  constructor(private userService: UserService) {
    this.signupInvalid = false;
  }

  ngOnInit() {
  }

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
        console.log(data);
      });
  }

  // Communicate with backend to sign user up
  signup(signupForm) {
    // Do nothing if form is invalid
    if (signupForm.invalid) {
      this.signupInvalid = true;
      return;
    }
    this.signupInvalid = false;

    console.log('signup');
    console.log(signupForm);
    console.log(signupForm.value);

    // Make signup request to backend
    this.userService.signup(signupForm.value)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
