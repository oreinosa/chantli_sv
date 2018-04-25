import { Component, ViewChild } from '@angular/core';
import { CategoriesService } from './categories.service';
import { Table } from '../../shared/classes/table';
import { Category } from '../../shared/classes/category';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends Table<Category>  {
  public displayedColumns = ['name', 'description', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoriesService: CategoriesService,
  ) {
    super(categoriesService);
  }

}