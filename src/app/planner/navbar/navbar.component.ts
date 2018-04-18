import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../home/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  // Log user out by redirecting them to home page and clearing jwt token
  logout() {
    this.userService.logout();
  }

  // Delete the user's account
  deleteAccount() {
    this.userService.delete()
      .subscribe((data: any) => {});
  }
}
