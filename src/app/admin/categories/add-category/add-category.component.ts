import { Component, ViewChild } from '@angular/core';
import { Category } from '../../../shared/classes/category';
import { CategoriesService } from '../categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Add } from '../../../shared/classes/add';
import { NotificationsService } from '../../../notifications/notifications.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent extends Add<Category> {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public categoriesService: CategoriesService,
    public notificationsService: NotificationsService
  ) {
    super('Categoría', categoriesService, router, route, notificationsService);
  }

  initForm() {
    this.object = new Category();
  }
}