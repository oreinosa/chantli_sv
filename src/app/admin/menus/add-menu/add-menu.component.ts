
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MenusService } from './../menus.service';
import { ProductsService } from './../../products/products.service';
import { NotificationsService } from '../../../notifications/notifications.service';
import { Menu } from './../../../shared/classes/menu';
import { Product } from './../../../shared/classes/product';
import { Add } from '../../../shared/classes/add';

import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent extends Add<Menu> {
  private ngUnsubscribe = new Subject();
  stateCtrl: FormControl;
  filteredProducts: Observable<Product[]>;
  products: Product[];
  addedProducts: Product[] = [];
  selectedProduct: Product;
  refresh: boolean;
  constructor(
    public menusService: MenusService,
    private productsService: ProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(menusService, router, route, notificationsService);

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
      .takeUntil(this.ngUnsubscribe)
      .map(products => products.filter(product => product.category === "Principal" || product.category === "Acompañamiento"))
      .subscribe(products => this.products = products);
  }

  selectProduct(name: string) {
    console.log(name);
    this.selectedProduct = this.filterProducts(name)[0];
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  addProduct() {
    console.log(this.selectedProduct);
    this.addedProducts.push(this.selectedProduct);
    this.selectedProduct = null;
    this.stateCtrl.setValue('');
    this.refresh = !this.refresh;
  }

  removeProduct(id: string) {
    console.log(id);
    console.log(this.addedProducts);
    let index = this.addedProducts.findIndex(product => product.id === id);
    this.addedProducts.splice(index, 1);
    this.refresh = !this.refresh;
  }


}
