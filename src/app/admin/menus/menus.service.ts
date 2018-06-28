import { Observable } from 'rxjs';
import { NotificationsService } from './../../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { Menu } from '../../shared/classes/menu';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../../shared/classes/product';
import { DAOSubcollection } from '../../shared/classes/dao-subcollection';
import { map } from 'rxjs/operators';
@Injectable()
export class MenusService extends DAOSubcollection<Menu, Product> {

  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Menu', 'menus', af, notificationsService, 'productos');
  }

  getAll(): Observable<Menu[]> {
    this.objectCollection = this.af.collection<Menu>('menus', ref => ref.orderBy('date', 'desc').limit(10));
    return this.objectCollection
      .snapshotChanges()
      .pipe(
        map(actions => {
          // console.log(actions);
          return actions.map(a => {
            let data = a.payload.doc.data() as Menu;
            data['id'] = a.payload.doc.id;
            return data;
          })
        }),
        map(menus => menus.map(menu => { menu.date = menu.date.toDate(); return menu }))
      );
  }

  add(menu: Menu, products: Product[]) {
    // let date = new Date(menu.date);
    menu.date.setUTCHours(12, 0, 0);
    // menu.date = date.getTime();
    console.log(menu.date);
    return super.add(menu, products);
  }

  update(id: string, menu: Menu, products: Product[], deletedProducts: Product[]) {
    // let date = new Date(menu.date);
    menu.date.setUTCHours(12, 0, 0);
    // menu.date = date.getTime();
    // console.log(date.toISOString());
    return super.update(id, menu, products, deletedProducts);
  }

  delete(id: string, subCollection: Product[]) {
    return super.delete(id, subCollection);
  }

  toggleMenuAvailability(id: string, flag: boolean): Promise<void> {
    return this.objectCollection.doc(id)
      .set({ available: flag }, { merge: true })
      .then(() => this.notificationsService
        .show(`Menu ${id} ${flag ? "disponible" : "cerrado"}`, 'Menús', `${flag ? "success" : "warning"}`));
  }
}
