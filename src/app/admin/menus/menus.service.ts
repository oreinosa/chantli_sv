import { NotificationsService } from './../../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../shared/classes/menu';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../../shared/classes/product';

@Injectable()
export class MenusService extends DAO<Menu> {

  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Menu', 'menus', af);
  }
  getAll(): Observable<Menu[]> {
    this.objectCollection = this.af.collection<Menu>('menus');
    return this.objectCollection
      // .valueChanges()
      .snapshotChanges()
      .map(actions => {
        // console.log(actions);
        return actions.map(a => {
          let data = a.payload.doc.data() as Menu;
          data['id'] = a.payload.doc.id;
          return data;
        })
      });
  }

  getMenuProducts(id: string): Observable<Product[]> {
    let menuProductsCollection: AngularFirestoreCollection<Product[]> = this.objectCollection.doc(id).collection('products');
    return menuProductsCollection
      .snapshotChanges()
      .map(actions => {
        // console.log(actions);
        return actions.map(a => {
          let data = a.payload.doc.data() as Menu;
          data['id'] = a.payload.doc.id;
          return data;
        })
      });
  }

  toggleMenuAvailability(id: string, flag: boolean): Promise<void> {
    return this.objectCollection.doc(id).update({
      available: flag
    })
      .then(() => this.notificationsService.show(`Menu ${id} ${flag ? "disponible" : "cerrado"}`, undefined, `${flag ? "success" : "warning"}`));
  }

}
