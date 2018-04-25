import { Component, ViewChild } from '@angular/core';
import { Category } from '../../../shared/classes/category';
import { CategoriesService } from '../categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Add } from '../../../shared/classes/add';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent extends Add<Category> {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public categoriesService: CategoriesService
  ) {
    super(categoriesService, router, route);
  }

  initForm() {
    this.object = new Category();
  }
}