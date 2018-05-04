// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// import { AuthService } from './auth.service'
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) { }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | boolean {
//     return this.auth
//       .user
//       .take(1)
//       .map(user => !!user)
//       .do(loggedIn => {
//         if (!loggedIn) {
//           console.log('access denied')
//           this.router.navigate(['home']);
//         }
//       })

//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private notService: NotificationsService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // console.log(this.auth.authenticated);
    if (this.auth.authenticated) { return true; }
    return this.auth
      .currentUserObservable
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        // console.log(loggedIn);
        if (!loggedIn) {
          // console.log("access denied")
          this.notService.show('Por favor, ingresa a tu cuenta primero.', 'Alerta', 'warning');
          this.router.navigate(['/ingresar']);
        }
      })
  }
}