import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Table } from '../../shared/classes/table';
import { Category } from '../../shared/classes/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../admin-table.css']
})
export class CategoriesComponent extends Table<Category>  {
  public displayedColumns = ['name', 'description', 'actions'];

  constructor(
    public categoriesService: CategoriesService,
  ) {
    super(categoriesService);
  }

}