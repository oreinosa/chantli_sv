import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from '../shared/classes/order';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../shared/classes/user';
import * as firebaseApp from 'firebase/app';
import { AngularFireFunctions } from 'angularfire2/functions';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {
  myOrdersCollection: AngularFirestoreCollection<Order>;

  private $action = new BehaviorSubject<{ name: string, object: Order }>({ name: "lista", object: null });

  constructor(
    private af: AngularFirestore,
    private functions: AngularFireFunctions,
    private notifications: NotificationsService
  ) {
  }

  getMyOrders(limit: number = 10, user: User): Observable<Order[]> {
    this.myOrdersCollection = this.af.collection<Order>('ordenes', ref => ref.where('user.id', '==', user.id).orderBy('date.by', 'desc').limit(limit));

    return this.myOrdersCollection
      .snapshotChanges().pipe(
        map(actions => {
          // console.log(actions);
          return actions.map(a => {
            let data = a.payload.doc.data() as Order;
            data['id'] = a.payload.doc.id;
            return data;
          })
        })
      );
  }

  get action(): Observable<{ name: string, object: Order }> {
    return this.$action.asObservable();
  }

  onAction(name: string, object: Order): void {
    this.$action.next({ name, object });
  }

  cancelOrder(order: Order, cancelStatus: string) {
    let updatedOrder: Partial<Order> = {
      status: cancelStatus
    };
    if (cancelStatus !== "Cancelado") {
      updatedOrder.paid = firebaseApp.firestore.FieldValue.delete() as any;
      updatedOrder.cancelled = firebaseApp.firestore.Timestamp.fromDate(new Date());
    }
    this.functions.httpsCallable('cancelOrder')({
      orderId: order.id,
      action: cancelStatus
    })
      .subscribe(a => console.log(a), e => console.log('error ', e));

    return this.myOrdersCollection
      .doc(order.id)
      .update(updatedOrder)
      .then(() => this.notifications.show('Orden cancelada', 'Mis órdenes', 'info'));
  }
}
