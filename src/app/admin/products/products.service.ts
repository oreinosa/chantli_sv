import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/classes/product';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ProductsService extends DAO<Product> {
  // private url: string = 'http://vapeclubsv.info/categories';
  // private headers: HttpHeaders;
  constructor(
    public af: AngularFirestore
  ) {
    super('products', af);
  }

  getAllByCategory(categoryName: string) {
    let observable: Observable<Product[]>;
    if (categoryName === 'all') {
      console.log(`All products`);
      observable = super.getAll();
    } else {
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      console.log(`Products by category ${categoryName}`);
      this.objectCollection = this.af.collection<Product>('products', ref => ref.where('category.name', '==', categoryName));
      observable = this.objectCollection
        .snapshotChanges()
        // .do(products => console.log(products))
        .map(actions => {
          // console.log(actions);
          return actions.map(a => {
            let data = a.payload.doc.data();
            data['id'] = a.payload.doc.id;
            return data as Product;
          });
        });
    }
    return observable
      .map(products => products.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }))
  }

  filterByPriceRange(ranges: number[], products: Product[]) {
    let _products: Product[] = [];
    
    return _products;
  }

}