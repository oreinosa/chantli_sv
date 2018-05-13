import { User } from './../../shared/classes/user';
import { OrdersService } from './../orders.service';
import { Order } from './../../shared/classes/order';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  @Input() dataSource = new MatTableDataSource<Order>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Order>(true, []);
  refresh: boolean;
  public displayedColumns = ['select', 'user', 'price', "date", 'actions'];

  payingUser: User;
  paying: boolean;

  totalDue: number = 0;
  payment: number = 0;
  change: number = 0;
  addChange: boolean;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersService
      .filteredOrders
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log(orders))
      .map(orders => orders.filter(order => !order.paid))
      .subscribe(orders => this.dataSource.data = this.payingUser ? orders : []);

    this.ordersService
      .payingUser
      .takeUntil(this.ngUnsubscribe)
      .do(user => console.log(user))
      .subscribe(user => this.payingUser = user);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onPay() {
    this.paying = true;
    let selectedOrders = this.selection.selected;
    let currentBalance = this.payingUser.balance;
    let newBalance = currentBalance + this.totalDue;
    if (this.addChange) {
      newBalance += this.change;
    }
    console.log(newBalance);
    return this.ordersService
      .payOrders(selectedOrders)
      .then(() => this.ordersService.updateBalance(this.payingUser.id, newBalance))
      .then(() => {
        this.paying = this.addChange = false;
        this.totalDue = this.payment = this.change = 0;
      });
  }

  calculateTotalDue() {
    let orders = this.selection.selected.slice();
    let total = 0;
    for (let order of orders) {
      total += order.price;
    }
    this.totalDue = total;
  }

}
