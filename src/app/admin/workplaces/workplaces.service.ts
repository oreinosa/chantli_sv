import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Workplace } from '../../shared/classes/workplace';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class WorkplacesService extends DAO<Workplace> {
  // private url: string = 'http://vapeclubsv.info/categories';
  // private headers: HttpHeaders;
  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Lugar de trabajo', 'workplaces', af, notificationsService);
  }

}