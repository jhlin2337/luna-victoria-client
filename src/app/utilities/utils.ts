import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Utils {

  constructor(private router: Router) { }

  // Log user out by redirecting them to home page and clearing jwt token
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
