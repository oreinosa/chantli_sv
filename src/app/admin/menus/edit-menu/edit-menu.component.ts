import { ProductsService } from './../../products/products.service';
import { Product } from './../../../shared/classes/product';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NotificationsService } from './../../../notifications/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenusService } from './../menus.service';
import { Menu } from './../../../shared/classes/menu';
import { Component, OnInit } from '@angular/core';
import { Edit } from '../../../shared/classes/edit';
import { FormControl } from '@angular/forms';

import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent extends Edit<Menu> {
  stateCtrl: FormControl;
  refresh: boolean;

  filteredProducts: Observable<Product[]>;
  products: Product[];

  selectedProducts: Product[] = [];
  deletedProducts: Product[] = [];
  selectedProduct: Product;

  constructor(
    public menusService: MenusService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService,
    public productsService: ProductsService
  ) {
    super(menusService, router, route, notificationsService);
    this.stateCtrl = new FormControl();
    this.filteredProducts = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(product => product ? this.filterProducts(product) : this.products.slice())
      );
  }

  ngOnInit() {
    this.service
      .object
      .takeUntil(this.ngUnsubscribe)
      .do(object => this.object = object)
      .do((object: Menu) => !!this.object ? false : this.onBack('../'))
      // .do(object => console.log(object))
      .filter(object => !!object)
      .switchMap(() => this.menusService.getMenuProducts(this.object.id))
      .takeUntil(this.ngUnsubscribe)
      .do(products => console.log(products))
      .subscribe(products => this.object.products = this.selectedProducts = products);

    this.productsService
      .getAll()
      .takeUntil(this.ngUnsubscribe)
      // .do(products => products.forEach(product => delete product.id))
      .map(products => products.filter(product => product.category === "Principal" || product.category === "Acompañamiento"))
      .subscribe(products => this.products = products);

  }

  selectProduct(name: string) {
    this.selectedProduct = this.filterProducts(name)[0];
  }

  filterProducts(name: string) {
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  addProduct() {
    this.selectedProducts.push(this.selectedProduct);
    this.selectedProduct = null;
    this.stateCtrl.setValue('');
    this.refresh = !this.refresh;
  }

  removeProduct(id: string) {
    let index = this.object.products.findIndex(product => product.id === id);
    if (index >= 0) {
      let removedProduct = this.selectedProducts[index];
      console.log(`Removed ${removedProduct.name}`);
      this.deletedProducts.push(removedProduct);
    }

    index = this.selectedProducts.findIndex(product => product.id === id);
    this.selectedProducts.splice(index, 1);

    this.refresh = !this.refresh;
  }

  onSubmit(menu: Menu): Promise<void> {
    console.log(this.selectedProducts);
    return this.menusService
      .update(this.object.id, menu, this.selectedProducts, this.deletedProducts)
      .then(flag => this.onBack('../'))
      .then(() => this.notificationsService.show(`Menu editado`, undefined, 'info'));
  }

}
