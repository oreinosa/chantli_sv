
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MenusService } from './../menus.service';
import { ProductsService } from './../../products/products.service';
import { Menu } from './../../../shared/classes/menu';
import { Product } from './../../../shared/classes/product';
import { Subject, Observable } from 'rxjs';
import { startWith, map, takeUntil, tap, } from 'rxjs/operators';
import { AddSubcollection } from '../../../shared/classes/add-subcollection';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent extends AddSubcollection<Menu, Product> implements OnDestroy {
  private ngUnsubscribe = new Subject();
  productCtrl: FormControl;

  filteredProducts: Observable<Product[]>;
  products: Product[];

  constructor(
    public menusService: MenusService,
    private productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
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

  initForm() {
    this.object = new Menu();
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectProduct(product: Product) {
    this.selectedSubcollectionObject = this.products.find(_product => _product.id === product.id);
    console.log(this.selectedSubcollectionObject);
  }

  filterProducts(name: string) {
    // console.log(name);
    return this.products.filter(_product => _product.name.toLowerCase().includes(name.toLowerCase()))
  }

  displayProductFn(product?: Product): string {
    return product ? product.name : '';
  }

}
