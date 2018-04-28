import { DAO } from './dao';
import { Product } from './product';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export class DAOProduct<T> extends DAO<T> {
  constructor(
    private categoryName: string,
    public af: AngularFirestore
  ) {
    super('Producto', 'products', af);
    this.objectCollection = af.collection<T>('products');
  }

  getAll(): Observable<T[]> {
    this.objectCollection = this.af.collection<T>('products', ref => ref.where('category.name', '==', this.categoryName));
    return this.objectCollection
      // .valueChanges()
      .snapshotChanges()
      .map(actions => {
        // console.log(actions);
        return actions.map(a => {
          let data = a.payload.doc.data() as T;
          data['id'] = a.payload.doc.id;
          return data;
        })
      });
  }

}