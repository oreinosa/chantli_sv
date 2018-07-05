import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Menu } from '../shared/classes/menu';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../shared/classes/product';
import { Order } from '../shared/classes/order';
import { NotificationsService } from '../notifications/notifications.service';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  private menusCol: AngularFirestoreCollection<Menu>;
  private bebidasCol: AngularFirestoreCollection<Product>;
  private ordersCol: AngularFirestoreCollection<Order>;
  menuSubject = new BehaviorSubject<Menu>(null);

  private $selectedDow: BehaviorSubject<number>;

  private $monday: Date;
  private $friday: Date;

  constructor(
    private af: AngularFirestore,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    const date = new Date();
    let day = date.getDay();
    if (day === 0 || day === 6) { day = 1; }
    this.$selectedDow = new BehaviorSubject<number>(day);
  }

  get selectedDow(): Observable<number> {
    return this.$selectedDow.asObservable();
  }

  setSelectedDow(dow: number) {
    this.$selectedDow.next(dow);
  }

  get monday(): Date {
    return this.$monday;
  }
  get friday(): Date {
    return this.$friday;
  }

  submitNewOrder(order: Order) {
    this.ordersCol = this.af.collection<Order>('ordenes');
    return this.ordersCol
      .add(order)
      .then(doc => this.notificationsService.show("Orden exitosa!", 'Nueva orden', "success"));
  }

  getMenus(from: Date, to: Date) {
    this.menusCol = this.af.collection<Menu>('menus',
      ref =>
        ref
          .where('date', '>=', from)
          .where('date', '<=', to)
    );

    return this.menusCol
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            let data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data } as Menu;
          });
        })
      );
  }

  getWeekMenus(currentDay?: Date): Observable<Menu[]> {
    let d = currentDay ? new Date(currentDay) : new Date();
    // d.setMonth(1);
    // d.setDate(15);
    console.log('today is ', d);

    // d.setDate(29);
    // console.log('Today date : ', d);
    // console.log('Monday : ', this.getMonday(d));
    // console.log('Friday : ', this.getFriday(d));

    this.$monday = this.getMonday(d);
    this.$friday = this.getFriday(d);

    return this.getMenus(this.$monday, this.$friday);

  }

  getMenusByDay(date: Date) {
    let from = new Date(date);
    let to = new Date(date);
    from.setHours(1, 0, 0);
    to.setHours(23, 0, 0);
    return this.getMenus(from, to);
  }

  getBebidas() {
    this.bebidasCol = this.af.collection('productos', ref => ref.where('category', '==', 'Bebida'));
    return this.bebidasCol
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data } as Product;
          });
        })
      );
  }

  selectMenu(menu: Menu) {
    this.menuSubject.next(menu);
  }

  private getMonday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    } else if (day == 0) {
      // diff -= 7;
    }
    d.setDate(diff);
    d.setHours(0, 0, 0);
    console.log(d);
    return new Date(d);
  }

  private getFriday(d: Date): Date {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + 5;
    if (day == 6) diff += 7;
    // if (day == 6 || day == 0) {
    // diff += day == 6 ? 3 : 7;
    // }
    d.setDate(diff);
    d.setHours(23, 0, 0);
    console.log(d);
    return new Date(d);
  }

}
