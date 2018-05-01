import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/classes/user';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class UsersService extends DAO<User> {
  // private url: string = 'http://vapeclubsv.info/categories';
  // private headers: HttpHeaders;
  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Usuario','users', af, notificationsService);
  }

}