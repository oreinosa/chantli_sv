import { NotificationsService } from './../../notifications/notifications.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../shared/classes/menu';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../../shared/classes/product';
import { DAOSubcollection } from '../../shared/classes/dao-subcollection';

@Injectable()
export class MenusService extends DAOSubcollection<Menu, Product> {

  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Menu', 'menus', af, notificationsService, 'products');
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
