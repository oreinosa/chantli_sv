import { Component, ViewChild } from '@angular/core';
import { ProductsService } from './products.service';
import { Table } from '../../shared/classes/table';
import { Product } from '../../shared/classes/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends Table<Product>  {
  public displayedColumns = ['name', 'description', 'imageURL', 'category', 'actions'];
  
  constructor(
    public productsService: ProductsService,
  ) {
    super(productsService);
  }

  // sortData() {
  //   console.log('sort data');
  //   const data = this.data.slice();
  //   if (!this.sort.active || this.sort.direction == '') {
  //     this.dataSource.data = this.data;
  //     return;
  //   }

  //   this.dataSource.data = data.sort((a, b) => {
  //     let isAsc = this.sort.direction == 'asc';
  //     switch (this.sort.active) {
  //       case 'name': return this.compare(a.name, b.name, isAsc);
  //       case 'category': return this.compare(a.category, b.category, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}