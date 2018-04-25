import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Workplace } from '../../shared/classes/workplace';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class WorkplacesService extends DAO<Workplace> {
  // private url: string = 'http://vapeclubsv.info/categories';
  // private headers: HttpHeaders;
  constructor(
    public af: AngularFirestore
  ) {
    super('workplaces', af);
  }

}