import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Menu } from '../shared/classes/menu';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {
  private menusCol: AngularFirestoreCollection<Menu>;
  menuSubject = new BehaviorSubject<Menu>(null);

  constructor(
    private af: AngularFirestore,
    private router: Router
  ) { }


  getWeekMenus(): Observable<Menu[]> {
    const d = new Date();
    // console.log('Today date : ', d);
    // console.log('Monday : ', this.getMonday(d));
    // console.log('Friday : ', this.getFriday(d));

    this.menusCol = this.af.collection<Menu>('menus',
      ref =>
        ref
          // .where('active', '==', true)
          // .where('date', '>=', this.getMonday(d))
          .where('date', '<=', this.getFriday(d))
    );

    return this.menusCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          if(!(data.date >= this.getMonday(d))) console.log(data.date - this.getMonday(d));
          return { id, ...data } as Menu;
        });
      })
    // .do(menus => this.logger.log('Menus : ', menus))
  }

  selectMenu(menu: Menu) {
    this.menuSubject.next(menu);
    this.router.navigate(['nueva-orden', menu.id, 1]);
  }

  private getMonday(d: Date): number {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    }
    d.setDate(diff);
    d.setUTCHours(15, 0, 0);
    console.log(d.toISOString());
    return new Date(d).getTime();
  }

  private getFriday(d: Date): number {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 5;
    if (day == 6 || day == 0) {
      // diff += day == 6 ? 3 : 7;
    }
    d.setDate(diff);
    d.setUTCHours(20, 0, 0);
    console.log(d.toISOString());
    return new Date(d).getTime();
  }

}
