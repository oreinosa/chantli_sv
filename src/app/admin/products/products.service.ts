import { Injectable } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from '../../notifications/notifications.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductsService extends DAO<Product> {

  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Producto', 'productos', af, notificationsService);
  }

  getAllByCategory(category: string) {
    console.log(`Products by category ${category}`);
    this.objectCollection = this.af.collection<Product>('productos', ref => ref.where('category', '==', category));
    return this.objectCollection
      .snapshotChanges().pipe(
        // .do(products => console.log(products))
        map(actions => {
          // console.log(actions);
          return actions.map(a => {
            let data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data as Product;
          });
        }));
  }

}