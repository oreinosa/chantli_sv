import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './../shared/classes/order';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { User } from '../shared/classes/user';

@Injectable()
export class OrdersService {

  private ordersCol: AngularFirestoreCollection<Order>;
  private orderDoc: AngularFirestoreDocument<Order>;

  private usersCol: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;

  filteredOrders = new BehaviorSubject<Order[]>([]);

  payingUser = new Subject<User>();

  private $mode = new BehaviorSubject<string>('empacar');

  constructor(
    private fs: AngularFirestore
  ) {
    let date = new Date();
    let firstDayOfYear = new Date();
    this.ordersCol = this.fs.collection<Order>('ordenes');
    this.usersCol = this.fs.collection<User>('usuarios', ref => ref.orderBy('name', 'asc'));
  }

  onSelectMode(mode: string): void {
    this.$mode.next(mode);
  }

  get mode(): Observable<string> {
    return this.$mode.asObservable();
  }

  filterOrders(orders: Order[]) {
    this.filteredOrders.next(orders);
  }

  getPayingUser(): Observable<User> {
    return this.payingUser.asObservable();
  }

  getUsers() {
    return this.usersCol
      .snapshotChanges()
      .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as User;
        });
      })
      );
  }

  getOrders(from?: Date, to?: Date) {
    if (from && to) {
      this.ordersCol = this.fs.collection<Order>('ordenes', ref =>
        ref
          // .orderBy('date.by', 'desc')
          .where('date.for', ">=", from)
          .where('date.for', "<=", to)
      );
    } else {
      this.ordersCol = this.fs.collection<Order>('ordenes', ref =>
        ref
        // .orderBy('date.for', 'desc')
        // .orderBy('products.principal', 'desc')
      );
    }
    return this.ordersCol
      .snapshotChanges()
      .pipe(
      map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        })
      })
      );
  }

  getOrdersByUser(id: string) {
    this.ordersCol = this.fs.collection<Order>('ordenes', ref => ref.where('user.id', '==', id).where('paid.flag', '==', false));

    return this.ordersCol
      .snapshotChanges()
      .pipe(
      map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        })
      })
      );
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : - 1);
  }

  onUpdateStatus(id: string, status: string) {
    console.log(id, ' set to ', status);
    return this.ordersCol.doc<Order>(id).update({ status: status });
  }

  updateBalance(id: string, balance: number, credit: number) {
    return this.usersCol
      .doc(id)
      .update({
        balance: balance,
        credit: credit
      });
  }

  payOrders(orders: Order[]) {
    let batch = this.fs.firestore.batch();
    let ref;
    for (let order of orders) {
      ref = this.ordersCol.doc(order.id).ref;
      batch.update(ref, { paid: new Date() });
    }
    return batch.commit();
  }

  payOrder(id: string) {
    return this.ordersCol
      .doc<Order>(id)
      .update({
        paid: new Date()
      });
  }

}
