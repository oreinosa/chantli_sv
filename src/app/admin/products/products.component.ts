import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Table } from '../../shared/classes/table';
import { Link } from '../../shared/classes/link';
import { MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  links: Link[];
  public displayedColumns = ['name', 'description', 'photoURL', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
  }


}