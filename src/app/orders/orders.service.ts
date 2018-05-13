import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
// import { Details } from './../shared/classes/details';
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

  payingUser = new BehaviorSubject<User>(null);

  constructor(
    private fs: AngularFirestore
  ) {
    let date = new Date();
    let firstDayOfYear = new Date();
    this.ordersCol = this.fs.collection<Order>('orders');
    this.usersCol = this.fs.collection<User>('users', ref => ref.orderBy('name', 'asc'));
  }

  filterOrders(orders: Order[]) {
    this.filteredOrders.next(orders);
  }

  getUsers() {
    return this.usersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as User;
        });
      });
  }

  getOrders(from?: Date, to?: Date) {
    if (from && to) {
      this.ordersCol = this.fs.collection<Order>('orders', ref =>
        ref
          // .orderBy('date.by', 'desc')
          .where('date.for', ">=", from)
          .where('date.for', "<=", to)
      );
    } else {
      this.ordersCol = this.fs.collection<Order>('orders', ref =>
        ref
        // .orderBy('date.for', 'desc')
        // .orderBy('products.principal', 'desc')
      );
    }
    return this.ordersCol
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as Order;
        })
      });
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onUpdateStatus(order: Order, status: string) {
    console.log(order.id, ' set to ', status);
    return this.ordersCol.doc<Order>(order.id).update({ status: status });
  }

  updateBalance(id: string, balance: number) {
    return this.usersCol
      .doc(id)
      .update({
        balance: balance
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
