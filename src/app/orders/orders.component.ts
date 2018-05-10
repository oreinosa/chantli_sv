import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { OrdersService } from './../orders/orders.service';
import { Order } from './../shared/classes/order';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  selectedRangeString: string = 'Para ahora';
  orders: Order[];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService
      .filteredOrders
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log(orders))
      .subscribe(orders => this.orders = orders);
  }

  onSelectRange(selectedRangeString: string) {
    this.selectedRangeString = selectedRangeString;
  }



}
