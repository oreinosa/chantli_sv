import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyOrdersService } from './../my-orders.service';
import { MyOrder } from '../my-order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent extends MyOrder {
  onSubmit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(
    myOrderService: MyOrdersService,
    router: Router
  ) {
    super(myOrderService, router);
  }

}