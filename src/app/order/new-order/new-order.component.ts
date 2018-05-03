import { Product } from './../../shared/classes/product';
import { NewOrder } from './../../shared/classes/new-order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Subject } from 'rxjs/Subject';
import { Menu } from '../../shared/classes/menu';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  order: NewOrder;
  step: number = 1;
  menu: Menu;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderService
      .menuSubject
      .takeUntil(this.ngUnsubscribe)
      .subscribe(menu => this.menu = menu);

    this.route
      .paramMap
      .takeUntil(this.ngUnsubscribe)
      .map(params => +params.get('step'))
      .subscribe(step => this.step = step ? step : 1);

    this.order = new NewOrder();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onStep1(principal: Product, acompanamientos: Product[]) {
    this.order.products.principal = principal;
    this.order.products.acompanamientos = acompanamientos;
  }


}
