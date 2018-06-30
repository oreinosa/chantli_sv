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
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortData() {
    console.log('sort data');
    const data = this.orders.slice();
    if (!this.sort.active || this.sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      let isAsc = this.sort.direction == 'asc';
      switch (this.sort.active) {
        case 'user': case 'principal': case 'bebida': return this.compare(a[this.sort.active], b[this.sort.active], isAsc);
        case 'date': return this.compare(a.date.for, b.date.for, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
