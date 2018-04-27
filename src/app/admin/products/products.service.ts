import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/classes/product';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ProductsService extends DAO<Product> {

  constructor(
    public af: AngularFirestore
  ) {
    super('Producto','products', af);
  }

  // getAllByCategory(category: string) {
  //   let observable: Observable<Product[]>;
  //   if (category === 'all') {
  //     console.log(`All products`);
  //     observable = super.getAll();
  //   } else {
  //     category = category.charAt(0).toUpperCase() + category.slice(1);
  //     console.log(`Products by category ${category}`);
  //     this.objectCollection = this.af.collection<Product>('products', ref => ref.where('category.name', '==', category));
  //     observable = this.objectCollection
  //       .snapshotChanges()
  //       // .do(products => console.log(products))
  //       .map(actions => {
  //         // console.log(actions);
  //         return actions.map(a => {
  //           let data = a.payload.doc.data();
  //           data['id'] = a.payload.doc.id;
  //           return data as Product;
  //         });
  //       });
  //   }
  //   return observable
  //     .map(products => products.sort((a, b) => {
  //       if (a.name < b.name) return -1;
  //       if (a.name > b.name) return 1;
  //       return 0;
  //     }))
  // }

}