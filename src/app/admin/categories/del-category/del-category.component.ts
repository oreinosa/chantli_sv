import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Subject } from 'rxjs/Subject';
import { Delete } from '../../../shared/classes/delete';
import { Category } from '../../../shared/classes/category';
import { NotificationsService } from '../../../notifications/notifications.service';

@Component({
  selector: 'app-del-category',
  templateUrl: './del-category.component.html',
  styleUrls: ['./del-category.component.css']
})
export class DelCategoryComponent extends Delete<Category> {
  constructor(
    public categoriesService: CategoriesService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(categoriesService, router, route, notificationsService);
  }


}