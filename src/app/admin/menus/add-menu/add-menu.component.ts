
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MenusService } from './../menus.service';
import { ProductsService } from './../../products/products.service';
import { Menu } from './../../../shared/classes/menu';
import { Product } from './../../../shared/classes/product';
import { Subject, Observable } from 'rxjs';
import { startWith, map, takeUntil, } from 'rxjs/operators';
import { AddSubcollection } from '../../../shared/classes/add-subcollection';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent extends AddSubcollection<Menu, Product> implements OnDestroy {
  private ngUnsubscribe = new Subject();
  stateCtrl: FormControl;

  filteredProducts: Observable<Product[]>;
  products: Product[];

  constructor(
    public menusService: MenusService,
    private productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(menusService, router, route);

    this.stateCtrl = new FormControl();
    this.filteredProducts = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(product => product ? this.filterProducts(product) : this.products.slice())
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectProduct(name: string) {
    this.selectedSubcollectionObject = this.filterProducts(name)[0];
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
