import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyOrdersService } from './../my-orders.service';
import { MyOrder } from '../my-order';
@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent extends MyOrder {
  onSubmit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(
    myOrderService: MyOrdersService,
    router: Router
  ) { super(myOrderService, router); }

}