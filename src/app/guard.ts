import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './home/user.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.getToken()) {
      return true;
    }

    this.userService.logout();
    return false;
  }
}
