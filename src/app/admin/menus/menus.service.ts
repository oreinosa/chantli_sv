import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from '../../shared/classes/menu';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class MenusService extends DAO<Menu> {

  constructor(
    public af: AngularFirestore
  ) {
    super('Menu','menus', af);
  }

}
