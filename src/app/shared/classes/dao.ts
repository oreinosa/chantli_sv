import { Observable, BehaviorSubject } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from "../../notifications/notifications.service";
import { DocumentReference } from "@firebase/firestore-types";
import * as firebase from 'firebase';
import { map } from "rxjs/operators";

export abstract class DAO<T> {
  object = new BehaviorSubject<T>(null);
  objectCollection: AngularFirestoreCollection<T>;

  constructor(
    public className: string,
    public collectionName: string,
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    this.objectCollection = af.collection<T>(collectionName);
  }

  getAll(): Observable<T[]> {
    this.objectCollection = this.af.collection<T>(this.collectionName);
    return this.objectCollection
      // .valueChanges()
      .snapshotChanges()
      .pipe(
        map(actions => {
          // console.log(actions);
          return actions.map(a => {
            let data = a.payload.doc.data() as T;
            data['id'] = a.payload.doc.id;
            return data;
          })
        })
      );
  }

  add(object: T, subcollection?: any[]): Promise<firebase.firestore.DocumentReference> {
    return this.objectCollection
      .add(object)
      .then(doc => {
        this.notificationsService.show(`${this.className} agregado`, this.collectionName.charAt(0).toUpperCase() + this.collectionName.substr(1), 'success');
        return doc;
      })
  }

  update(id: string, object: T, subcollection?: any[], deleted?: any[]): Promise<T> {
    // console.log(id);
    return this.objectCollection
      .doc(id)
      .set(object, { merge: true })
      .then(doc => {
        this.notificationsService.show(`${this.className} editado`, this.collectionName.charAt(0).toUpperCase() + this.collectionName.substr(1), 'info');
        return object;
      });
  }

  delete(id: string, subcollection?: any[]): Promise<string> {
    return this.objectCollection
      .doc(id)
      .delete()
      .then(() => {
        this.notificationsService.show(`${this.className} borrado`, this.collectionName.charAt(0).toUpperCase() + this.collectionName.substr(1), 'danger');
        return id;
      });
  }
}