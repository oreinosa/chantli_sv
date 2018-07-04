import { ProductsService } from './../../products/products.service';
import { Product } from './../../../shared/classes/product';
import { Observable, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, takeUntil, tap } from 'rxjs/operators';
import { EditSubcollection } from '../../../shared/classes/edit-subcollection';

import * as firebaseApp from 'firebase/app';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent extends EditSubcollection<Menu, Product> {
  productCtrl: FormControl;
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
    this.productCtrl = new FormControl();
    this.filteredProducts = this.productCtrl.valueChanges
      .pipe(
        startWith(''),
        map((product: any) => (typeof product === 'object') ? product.name : product),
        tap(product => console.log(product)),
        map((product:string) => product ? this.filterProducts(product) : this.products.slice())
      );
  }

  ngOnInit() {
    super.ngOnInit();
    this.productsService
      .getAll()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(products => products.filter(product => product.category === "Principal" || product.category === "Acompañamiento"))
      )
      .subscribe(products => this.products = products);

  }

  selectProduct(product: Product) {
    this.selectedSubcollectionObject = this.products.find(_product => _product.id === product.id);
    console.log(this.selectedSubcollectionObject);
  }

  filterProducts(name: string) {
    return this.products.filter(_product => _product.name.toLowerCase().includes(name.toLowerCase()));
  }

  getMenuDateString(date: any): Date | string {
    // console.log(date);
    if (date instanceof firebaseApp.firestore.Timestamp) {
      const timestamp = date as firebaseApp.firestore.Timestamp;
      return timestamp.toDate().toISOString();
    }
    return '';
  }

  displayProductFn(product?: Product): string {
    return product ? product.name : '';
  }

}
