import { NotificationsService } from './../../../notifications/notifications.service';
import { Component, ViewChild } from '@angular/core';
import { Category } from '../../../shared/classes/category';
import { Edit } from '../../../shared/classes/edit';
import { CategoriesService } from '../categories.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent extends Edit<Category> {
  constructor(
    public categoriesService: CategoriesService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(categoriesService, router, route, notificationsService);
  }

}