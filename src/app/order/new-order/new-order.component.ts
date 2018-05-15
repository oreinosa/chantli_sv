import { Product } from './../../shared/classes/product';
import { NewOrder } from './../../shared/classes/new-order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Subject } from 'rxjs';
import { Menu } from '../../shared/classes/menu';
import { Order } from '../../shared/classes/order';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/classes/user';
import { NotificationsService } from '../../notifications/notifications.service';
import { take, tap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  newOrder: NewOrder;
  step: number = 1;
  menu: Menu;
  user: User;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.authService
      .user
      .pipe(
        take(1)
      )
      .subscribe(user => this.user = user);

    this.orderService
      .menuSubject
      .pipe(
        take(1),
        tap(menu => menu ? false : this.router.navigate(['menu']))
      )
      .subscribe(menu => this.menu = menu);

    this.route
      .paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(params => +params.get('step'))
      )
      .subscribe(step => this.step = step ? step : 1);

    this.newOrder = new NewOrder({ principal: null, acompanamientos: [], bebida: null });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.orderService.selectMenu(null);
  }

  onSelect(principal: Product, acompanamientos: Product[]) {
    this.newOrder.products.principal = principal;
    this.newOrder.products.acompanamientos = acompanamientos;
    this.router.navigate(['../', 2], { relativeTo: this.route });
  }

  onSelectBebida(bebida: Product) {
    this.newOrder.products.bebida = bebida;
    this.router.navigate(['../', 3], { relativeTo: this.route });
  }

  onConfirm(tortillas: number, price: number) {
    let products = this.newOrder.products;
    let acompanamientos: string[] = products.acompanamientos.map(product => product.name);
    let orderedBy = new Date();
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
        for: this.menu.date,
        by: orderedBy
      },
      status: "Nueva orden",
      user: {
        id: this.user.id,
        name: this.user.name,
        workplace: this.user.workplace,
      }
    };

    this.orderService
      .submitNewOrder(order)
      .then(() => this.router.navigate(['menu']));
  }

}
