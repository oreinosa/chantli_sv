import { takeUntil, tap, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { Order } from './../shared/classes/order';
import { MyOrdersService } from './my-orders.service';
import { Router } from '@angular/router/src/router';

export abstract class MyOrder implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  order: Order;

  constructor(
    public myOrderService: MyOrdersService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.myOrderService.action.pipe(
      takeUntil(this.ngUnsubscribe),
      map(action => action.object),
      tap(order => !!order ? false : this.onBack()),
      filter(order => !!order),
    )
      .subscribe(order => this.order = order);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.myOrderService.onAction('lista', null);
  }

  abstract onSubmit(...args): void;

  onCancel(): void {
    this.myOrderService.onAction('lista', null);
    // this.onBack();
  }

  onBack(): void {
    this.router.navigate(['mis-ordenes']);
  }
}
