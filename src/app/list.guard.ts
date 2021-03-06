import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class ListGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.loginService.getToken())
    if (this.loginService.getToken()) {
      return true;
    } else {
      debugger;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
