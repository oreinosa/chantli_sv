import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { OrdersService } from './../orders/orders.service';
import { Order } from './../shared/classes/order';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  selectedRangeString: string = 'Para ahora';
  dataSource = new MatTableDataSource<Order>([]);
  mode: string = 'empacar';
  // orders: Order[];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ordersService
      .filteredOrders
      .skip(1)
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log(orders))
      .subscribe(orders => this.dataSource.data = orders);
    // .subscribe(orders => this.orders = orders);

  }

  onSelectMode(mode: string) {
    this.mode = mode;
    this.router.navigate(['../', mode], { relativeTo: this.route });
  }

  onSelectRange(selectedRangeString: string) {
    this.selectedRangeString = selectedRangeString;
  }

}
