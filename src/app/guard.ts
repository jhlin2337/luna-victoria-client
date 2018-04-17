import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppSettings } from './app-settings';

@Injectable()
export class Guard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(AppSettings.JWT_TOKEN)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
