import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UpdateService {
  online$: Observable<boolean>;

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar, private router: Router) {
    if (this.swUpdate.isEnabled) {
      console.log('swUpdate not enabled');
      this.swUpdate.available.subscribe(evt => {
        console.log('available : ', evt);
        // const snack = this.snackbar.open('Actualización disponible!', 'Actualizar');

        // snack
        //   .onAction()
        //   .subscribe(() => {
        //     window.location.reload();
        //   });

        // setTimeout(() => {
        //   snack.dismiss();
        // }, 6000);
      });
    }
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    // this.online$
    //   .subscribe(flag => !flag ? this.router.navigate(['offline']) : false);
  }
}