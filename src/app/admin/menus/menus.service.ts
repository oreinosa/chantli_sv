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
    super('Menu', 'menus', af, notificationsService, 'products');
  }

  getAll(): Observable<Menu[]> {
    return super.getAll()
      .pipe(
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

  toggleMenuAvailability(id: string, flag: boolean): Promise<void> {
    return this.objectCollection.doc(id)
      .update({ available: flag })
      .then(() => this.notificationsService
        .show(`Menu ${id} ${flag ? "disponible" : "cerrado"}`, undefined, `${flag ? "success" : "warning"}`));
  }


  // deleteProduct(idProduct: string, idMenu: string) {
  //   let productsCollection = this.objectCollection.doc(idMenu).collection<Product>('products');
  //   let productDocument = productsCollection.doc(idProduct);
  //   return productDocument.delete();
  // }

  // private addProducts(products: Product[]): Promise<void> {
  //   return
  // }

}
