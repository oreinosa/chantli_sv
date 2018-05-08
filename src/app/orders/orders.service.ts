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

  constructor(
    private fs: AngularFirestore
  ) {
    let date = new Date();
    let firstDayOfYear = new Date();
    this.ordersCol = this.fs.collection<Order>('orders');
    this.usersCol = this.fs.collection<User>('users', ref => ref.orderBy('name', 'asc'));
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
          .where('date.for', ">=", from)
          .where('date.for', "<=", to)
        // .orderBy('products.principal', 'desc')
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

  onPay(order: Order) {
    const date = new Date();
    console.log(order.id, ' paid by ', date);
    // order.paid = date;
    this.ordersCol.doc(order.id).update({ paid: date });
  }

}
