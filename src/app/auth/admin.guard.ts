import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthService } from './auth.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notService: NotificationsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log(this.auth.authenticated);
    // if (!this.auth.authenticated) { return false; }
    return this.auth.
      user
      .pipe(
        take(1),
        // .skip(1)
        // .do(user => console.log(user))
        map(user => user.role === "Admin"),
        tap(role => {
          // console.log(workplace)
          if (!role) {
            // console.log("access denied");
            this.notService.show('Oops, solo para administradores ;)', 'Acceso denegado', 'info');
            this.router.navigate(['']);
          }
        })
      )
  }
}