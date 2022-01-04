import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserDataService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.loggedIn()) {
      if (this.userService.getAccessByPath(state.url)) {
        return true;
      } else {
        this.router.navigate(['/401']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
