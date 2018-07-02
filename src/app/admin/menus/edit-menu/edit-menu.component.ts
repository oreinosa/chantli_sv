import { ProductsService } from './../../products/products.service';
import { Product } from './../../../shared/classes/product';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { EditSubcollection } from '../../../shared/classes/edit-subcollection';

import * as firebaseApp from 'firebase/app';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent extends EditSubcollection<Menu, Product> {
  stateCtrl: FormControl;
  date: string;
  filteredProducts: Observable<Product[]>;
  products: Product[];

  constructor(
    public menusService: MenusService,
    public router: Router,
    public route: ActivatedRoute,
    public productsService: ProductsService
  ) {
    super(menusService, router, route);
    this.stateCtrl = new FormControl();
    this.filteredProducts = this.stateCtrl.valueChanges
      .pipe(
      startWith(''),
      map(product => product ? this.filterProducts(product) : this.products.slice())
      );
  }

  ngOnInit() {
    super.ngOnInit();
    this.productsService
      .getAll()
      .pipe(
      takeUntil(this.ngUnsubscribe),
      map(products => products.filter(product => product.category === "Principal" || product.category === "Acompañamiento")),
      map(products => products.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }))
      )
      .subscribe(products => this.products = products);

  }

  selectProduct(name: string) {
    this.selectedSubcollectionObject = this.filterProducts(name)[0];
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase()));
  }

  getMenuDateString(date: any): Date | string {
    // console.log(date);
    if (date instanceof firebaseApp.firestore.Timestamp) {
      const timestamp = date as firebaseApp.firestore.Timestamp;
      return timestamp.toDate().toISOString();
    }
    return '';
  }

}
