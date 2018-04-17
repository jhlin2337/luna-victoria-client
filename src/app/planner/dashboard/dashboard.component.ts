import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../home/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  // Log user out by redirecting them to home page and clearing jwt token
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // Delete the user's account
  deleteAccount() {
    this.userService.delete()
      .subscribe((data: any) => {});

    this.router.navigate(['/']);
  }
}
