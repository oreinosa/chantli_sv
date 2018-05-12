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
  mode: string = 'empacar';

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectMode(mode: string) {
    this.mode = mode;
    this.router.navigate(['../', mode], { relativeTo: this.route });
  }

  onSelectRange(selectedRangeString: string) {
    this.selectedRangeString = selectedRangeString;
  }

}
