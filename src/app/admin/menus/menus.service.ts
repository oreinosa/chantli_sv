import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../shared/classes/menu';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../../shared/classes/product';

@Injectable()
export class MenusService extends DAO<Menu> {
  menuProductsCollection: AngularFirestoreCollection<Product[]>;

  constructor(
    public af: AngularFirestore
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
      })
      .map(menus => {
        menus.map(menu => {
          this.menuProductsCollection = this.objectCollection.doc(menu.id).collection('products');
          return menu;
        });
        return menus;
      });
  }

}
