import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Menu } from '../shared/classes/menu';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private menusCol: AngularFirestoreCollection<Menu>;

  constructor(
    private af: AngularFirestore
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
          .where('date', '>=', this.getMonday(d))
          .where('date', '<=', this.getFriday(d))
    );

    return this.menusCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Menu;
        });
      })
    // .do(menus => this.logger.log('Menus : ', menus))
  }

  private getMonday(d: Date): number {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    }
    d.setDate(diff);
    d.setUTCHours(11, 0, 0);
    // console.log(d.toUTCString());
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
    d.setUTCHours(14, 0, 0);
    // console.log(d.toUTCString());
    return new Date(d).getTime();
  }

}
