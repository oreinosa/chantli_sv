import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Order } from '../shared/classes/order';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../shared/classes/user';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {
  myOrdersCollection: AngularFirestoreCollection<Order>;

  private $action = new BehaviorSubject<{ name: string, object: Order }>({ name: "lista", object: null });

  constructor(
    private af: AngularFirestore,
  ) {
  }

  getMyOrders(limit: number = 10, user: User): Observable<Order[]> {
    this.myOrdersCollection = this.af.collection<Order>('ordenes', ref => ref.where('user.id', '==', user.id).orderBy('date', 'desc').limit(limit));

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

  cancelOrder(id: string) {
    this.myOrdersCollection.doc(id).update({
      status: 'Cancelado'
    });
  }
}
