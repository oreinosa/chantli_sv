import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { MyOrdersService } from './my-orders.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/classes/user';
import { Order } from '../shared/classes/order';

import { take, takeUntil, tap, switchMap, startWith, map, filter } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss', '../admin/admin-table.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject();
  dataSource = new MatTableDataSource<Order>();
  displayedColumns = ["products", "date", "price", "status", "paid", "actions"]
  loaded = false;

  user: User;
  limitSubject: BehaviorSubject<number>;
  limits: number[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  showList: boolean = true;

  constructor(
    private myOrdersService: MyOrdersService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) {
  }

  ngOnInit() {


    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.auth
      .user.pipe(
        takeUntil(this.ngUnsubscribe),
        tap(user => {
          console.log(user);
          this.user = user;
          this.limits = [5, 10, 30];
          this.limitSubject = new BehaviorSubject<number>(10)
        }),
        switchMap(() => this.limitSubject),
        takeUntil(this.ngUnsubscribe),
        tap(limit => {
          console.log('limit to ', limit);
          this.loaded = false;
        }),
        switchMap(limit => this.myOrdersService.getMyOrders(limit, this.user)),
        takeUntil(this.ngUnsubscribe),
        map(orders => orders
          .sort((a, b) => this.compare(a.date.by.toDate(), b.date.by.toDate(), false))
          .sort((a, b) => this.compare(a.date.for.toDate(), b.date.for.toDate(), false))
        ),
        tap(orders => {
          console.log(orders);
          if (this.dataSource.data.length) { this.notifications.show("Lista de órdenes actualizada!", "Mis órdenes", "info") }
          this.dataSource.data = orders;
          this.myOrdersService.onAction(null);
        })
      )
      .subscribe(() => this.loaded = true);

    this.myOrdersService.action.pipe(
      takeUntil(this.ngUnsubscribe),
      map(action => !!action ? false : true)
    )
      .subscribe(flag => this.showList = flag);
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : - 1);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectLimit(limit: number) {
    this.limitSubject.next(limit);
  }

  onAction(name: string, object: Order) {
    this.myOrdersService.onAction(object);
    console.log('action ', name);
    object ? console.log(object) : false;
    let route = name;
    if (object) route += '/' + object.id;
    this.router.navigate([route], { relativeTo: this.route });
  }

}
