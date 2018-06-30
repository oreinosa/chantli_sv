import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { MyOrdersService } from './my-orders.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/classes/user';
import { Order } from '../shared/classes/order';

import { takeUntil, tap, switchMap, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css', '../admin/admin-table.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ["products", "date", "price", "status", "actions"]
  loaded = false;

  user: User;
  limitCtrl = new FormControl();
  limits: number[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private myOrdersService: MyOrdersService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    // this.$myOrders = 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // this.auth
    //   .user.pipe(
    //     takeUntil(this.ngUnsubscribe),
    //     tap(user => {
    //       console.log(user);
    //       this.user = user
    //     }),
    //     switchMap(() => this.limit.asObservable()),
    //     takeUntil(this.ngUnsubscribe),
    //     tap(limit => console.log('limit to ', limit)),
    //     switchMap(limit => this.myOrdersService.getMyOrders(limit, this.user)),
    //     takeUntil(this.ngUnsubscribe),
    //     tap(orders => {
    //       console.log(orders);
    //       this.loaded = false;
    //       this.dataSource.data = orders;
    //     })
    //   )
    //   .subscribe(() => this.loaded = true);


    this.auth
      .user.pipe(
        takeUntil(this.ngUnsubscribe),
        tap(user => {
          console.log(user);
          this.user = user;
          this.limits = [1, 3, 5];
        }))
      .subscribe(() => this.limitCtrl.setValue(10));

    this.limitCtrl.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      tap(limit => console.log('limit to ', limit)),
      switchMap(limit => this.myOrdersService.getMyOrders(limit, this.user)),
      takeUntil(this.ngUnsubscribe),
      tap(orders => {
        console.log(orders);
        this.loaded = false;
        this.dataSource.data = orders;
      })
    )
      .subscribe(() => this.loaded = true);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
