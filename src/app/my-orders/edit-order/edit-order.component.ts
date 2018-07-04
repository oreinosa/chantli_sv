import { NewOrder } from './../../shared/classes/new-order';
import { OrderService } from './../../order/order.service';
import { Menu } from './../../shared/classes/menu';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/classes/order';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyOrdersService } from './../my-orders.service';
import { MyOrder } from '../my-order';
import { tap } from 'rxjs/operators';
import { Product } from '../../shared/classes/product';

import * as firebaseApp from 'firebase/app';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent extends MyOrder {
  $menus: Observable<Menu[]>;
  step: number = 0;
  selectedMenu: Menu;
  editingOrder: NewOrder;

  onSubmit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(
    private orderService: OrderService,
    myOrderService: MyOrdersService,
    router: Router,
    private route: ActivatedRoute
  ) {
    super(myOrderService, router);
  }

  ngOnInit() {
    super.ngOnInit();
    // this.myOrderService.editingStep.pipe(
    //   tap(step => console.log('Step ', step)))
    //   .subscribe(step => this.step = step);

    this.editingOrder = new NewOrder({ principal: null, acompanamientos: [], bebida: null });
  }

  getMenus(order: Order) {
    let date = order.date.for.toDate();
    this.$menus = this.orderService.getMenusByDay(date);
  }

  onOrderMenu(menu: Menu) {
    this.step = 1;
    this.selectedMenu = menu;
  }

  onSelect(principal: Product, acompanamientos: Product[]) {
    this.editingOrder.products.principal = principal;
    this.editingOrder.products.acompanamientos = acompanamientos;
    this.step = 2;
  }

  onSelectBebida(bebida: Product) {
    this.editingOrder.products.bebida = bebida;
    this.step = 3;
  }

  onConfirm(tortillas: number, price: number) {
    let products = this.editingOrder.products;
    let acompanamientos: string[] = products.acompanamientos.map(product => product.name);
    let orderedBy = firebaseApp.firestore.Timestamp.fromDate(new Date());
    // orderedBy.setUTCHours(12, 0, 0);

    let order: Order = {
      products: {
        principal: products.principal.name,
        acompanamientos: acompanamientos,
        bebida: products.bebida.name,
      },
      tortillas: tortillas,
      price: price,
      date: {
        for: this.selectedMenu.date,
        by: orderedBy
      },
    };

    if (products.principal.noSides) {
      delete order.products.acompanamientos;
    }

    if (products.principal.noTortillas) {
      delete order.tortillas;
    }

    this.myOrderService
      .editOrder(order)
      .then(() => this.router.navigate(['mis-ordenes']));
  }

}