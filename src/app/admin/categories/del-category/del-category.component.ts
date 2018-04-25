import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { Subject } from 'rxjs/Subject';
import { Delete } from '../../../shared/classes/delete';
import { Category } from '../../../shared/classes/category';

@Component({
  selector: 'app-del-category',
  templateUrl: './del-category.component.html',
  styleUrls: ['./del-category.component.css']
})
export class DelCategoryComponent extends Delete<Category> {
  constructor(
    categoriesService: CategoriesService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(categoriesService, router, route);
  }


}