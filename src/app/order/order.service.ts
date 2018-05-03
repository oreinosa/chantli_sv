import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Menu } from '../shared/classes/menu';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Product } from '../shared/classes/product';
import { Order } from '../shared/classes/order';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class OrderService {
  private menusCol: AngularFirestoreCollection<Menu>;
  private bebidasCol: AngularFirestoreCollection<Product>;
  private ordersCol: AngularFirestoreCollection<Order>;
  menuSubject = new BehaviorSubject<Menu>(null);

  constructor(
    private af: AngularFirestore,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.ordersCol = this.af.collection<Order>('orders');
  }

  submitNewOrder(order: Order) {
    return this.ordersCol
      .add(order)
      .then(doc => this.notificationsService.show("Orden exitosa!", 'Nueva orden', "success"));
  }

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
  }

  getBebidas() {
    this.bebidasCol = this.af.collection('products', ref => ref.where('category', '==', 'Bebida'));
    return this.bebidasCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Product;
        });
      });
  }

  // getWeekMenu(id: string): Observable<Menu> {
  //   this.menusCol = this.af.collection<Menu>('menus');
  //   return this.menusCol
  //     .doc(id)
  //     .snapshotChanges()
  //     .map(action => {
  //       if (action.payload.exists) {
  //         let data = action.payload.data();
  //         data['id'] = action.payload.id;
  //         return data as Menu;
  //       }
  //       return null;
  //     });
  // }

  selectMenu(menu: Menu) {
    if (menu) {
      this.menuSubject.next(menu);
      this.router.navigate(['nueva-orden', menu.id, 1]);
    } else {
      this.menuSubject.next(null);
    }
  }

  private getMonday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    }
    d.setDate(diff);
    d.setHours(0, 0, 0);
    // console.log(d);
    return new Date(d);
  }

  private getFriday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 5;
    if (day == 6 || day == 0) {
      // diff += day == 6 ? 3 : 7;
    }
    d.setDate(diff);
    d.setHours(23, 0, 0);
    // console.log(d);
    return new Date(d);
  }

}
