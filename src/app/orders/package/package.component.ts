import { OnDestroy } from '@angular/core';
import { OrdersService } from './../orders.service';
import { Order } from './../../shared/classes/order';
import { Subject } from 'rxjs';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss', '../../admin/admin-table.css']
})
export class PackageComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  orders: Order[];
  @Input() dataSource = new MatTableDataSource<Order>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  statuses = [
    "Nueva orden",
    "Empacado",
    "Entregado",
    "Cancelado",
    "Cancelado (reembolso)"
  ];

  range: string;

  public displayedColumns = ['user', 'principal', 'acompanamientos', 'bebida', "date", 'actions'];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService
      .filteredOrders
      .pipe(
      takeUntil(this.ngUnsubscribe),
      tap(orders => console.log(orders)),
      tap(orders => this.orders = orders)
      )
      .subscribe(orders => this.sortData());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectRange(range: string) {
    this.range = range;
  }

  sortData() {
    console.log('sort data');
    const data = this.orders.slice();
    if (!this.sort.active || this.sort.direction == '') {
      this.dataSource.data = data;
      return;
    }
    // console.log(this.sort.active);
    this.dataSource.data = data.sort((a, b) => {
      let isAsc = this.sort.direction == 'asc';
      switch (this.sort.active) {
        case 'user': return this.compare(a.user.name, b.user.name, isAsc);
        case 'principal': case 'bebida': return this.compare(a.products[this.sort.active], b.products[this.sort.active], isAsc);
        case 'date': return this.compare(a.date.for, b.date.for, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {
    // console.log(a, 'vs', b)
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onUpdateStatus(orderId: string, status: string) {
    this.ordersService.onUpdateStatus(orderId, status);
  }

}
