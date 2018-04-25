import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export class DAO<T> {
  public objects = new Observable<T[]>();
  public object = new BehaviorSubject<T>(null);
  public objectCollection: AngularFirestoreCollection<T>;
  public objectDocument: AngularFirestoreDocument<T>;

  constructor(
    private collectionName: string,
    public af: AngularFirestore
  ) {
    this.objectCollection = af.collection<T>(collectionName);
  }
  
  getAll(): Observable<T[]> {
    this.objectCollection = this.af.collection<T>(this.collectionName);
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

  add(object: T) {
    return this.objectCollection
      .add(object);
  }

  update(id: string, object: T) {
    // console.log(id);
    return this.objectCollection
      .doc(id)
      .set(object, { merge: true });
  }

  delete(id: string) {
    return this.objectCollection
      .doc(id)
      .delete();
  }
}