import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../shared/classes/category';
import { DAO } from '../../shared/classes/dao';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable()
export class CategoriesService extends DAO<Category> {
  // private url: string = 'http://vapeclubsv.info/categories';
  // private headers: HttpHeaders;
  constructor(
    public af: AngularFirestore,
    public notificationsService: NotificationsService
  ) {
    super('Categoría','categories', af, notificationsService);
  }

}