import { ProductsService } from './../../products/products.service';
import { Product } from './../../../shared/classes/product';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { EditSubcollection } from '../../../shared/classes/edit-subcollection';
@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent extends EditSubcollection<Menu, Product> {
  stateCtrl: FormControl;

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
      .takeUntil(this.ngUnsubscribe)
      .map(products => products.filter(product => product.category === "Principal" || product.category === "Acompañamiento"))
      .map(products => products.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }))
      .subscribe(products => this.products = products);

  }

  selectProduct(name: string) {
    this.selectedSubcollectionObject = this.filterProducts(name)[0];
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
