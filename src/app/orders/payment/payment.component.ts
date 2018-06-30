import { Observable, Subject, of } from 'rxjs';
import { User } from './../../shared/classes/user';
import { OrdersService } from './../orders.service';
import { Order } from './../../shared/classes/order';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntil, tap, map, filter, switchMap, take, startWith } from 'rxjs/operators';
import { WorkplacesService } from 'src/app/admin/workplaces/workplaces.service';
import { Workplace } from 'src/app/shared/classes/workplace';
import { FormControl } from '@angular/forms';

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
  public displayedColumns = ['select', 'price', "date", 'actions'];

  payingUser: User;
  paying: boolean;

  totalDue: number = 0;
  payment: number = 0;
  change: number = 0;
  addChange: boolean;

  workplaces: Workplace[];
  selectedWorkplace: string = 'TELUS International';

  selectedUserCtrl = new FormControl();
  users: User[];
  allUsers: User[];
  filteredUsers: Observable<User[]>;

  allFromWorkplace: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private workplacesService: WorkplacesService
  ) { }

  ngOnInit() {

    this.workplacesService.getAll().pipe(
      take(1))
      .subscribe(workplaces => this.workplaces = workplaces);

    this.filteredUsers = this.ordersService.getUsers().pipe(
      takeUntil(this.ngUnsubscribe),
      tap(users => {
        console.log(users);
        this.allUsers = users;
        this.filterByWorkplace(this.selectedWorkplace);
        if (this.payingUser) {
          const updatedUser = users.find(user => user.id === this.payingUser.id);
          const oldCredit = this.payingUser.credit;
          const oldDebit = this.payingUser.debit;
          const newCredit = updatedUser.credit;
          const newDebit = updatedUser.debit;

          if (newCredit !== oldCredit || newDebit !== oldDebit) {
            console.log('updating ', this.payingUser.name, ' balance ');
            this.selectPayingUser(updatedUser);
          }
        };
      }),
      switchMap(() => this.selectedUserCtrl.valueChanges),
      // startWith<string | User>(''),
      // tap(user => console.log(typeof user, user)),
      map(user => (typeof user === 'object' && user) ? user.name : user as string),
      map(user => this.users ? this.filterUsers(user ? user : '') : this.allUsers),
      // tap(users => console.log(users))
    );

    this.ordersService
      .payingUser.pipe(
      takeUntil(this.ngUnsubscribe),
      tap(user => {
        // console.log('paying user ', user);
        this.payingUser = user;
      }),
      tap(() => (!!this.payingUser || (!this.payingUser && this.allFromWorkplace)) ? false : this.dataSource.data = []),
      filter(() => (!!this.payingUser || (!this.payingUser && this.allFromWorkplace))),
      switchMap(user => user ? this.ordersService.getOrdersByUser(user.id) : this.ordersService.getOrdersByWorkplace(this.selectedWorkplace)),
      tap(orders => console.log(orders)),
      map(orders => orders.filter(order => {
        switch (order.status) {
          case 'Cancelado':
          case 'Cancelado (reembolso)':
            return false;
        }
        return true;
      })),
      // map(orders => orders.filter(order => !order.paid.flag)),
      takeUntil(this.ngUnsubscribe)
      )
      .subscribe(orders => this.dataSource.data = orders);
    // .subscribe(orders => this.dataSource.data = (this.payingUser || (!this.payingUser && this.allFromWorkplace)) ? orders : []);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  selectPayingUser(user: User) {
    // console.log('Paying user ', user);
    this.ordersService.setPayingUser(user);
  }

  filterByWorkplace(workplace: string) {
    // console.log('filter users by workplace ', workplace);
    this.users = this.allUsers.filter(user => user.workplace === workplace);
    // console.log(this.users);
    // this.selectedUserCtrl.setValue(this.selectedUserCtrl.value);
  }

  private filterUsers(name: string): User[] {
    // console.log('filtering from ', this.users);
    return this.users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase()));
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
    let selectedOrders: Order[] = this.selection.selected;
    let currentDebit: number = this.payingUser.debit;
    let newDebit = currentDebit - this.totalDue;
    let newCredit = this.payingUser.credit;
    if (this.addChange) {
      newCredit += this.change;
    }
    // console.log(newDebit);
    return this.ordersService
      .payOrders(selectedOrders)
      .then(() => this.ordersService.updateBalance(this.payingUser.id, newDebit, newCredit))
      .then(() => {
        this.paying = false;
        this.addChange = false;
        this.totalDue = 0;
        this.payment = 0;
        this.change = 0;
        this.selection.clear();
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

  calculateChange() {
    this.change = parseFloat(((this.payment + this.payingUser.credit) - this.totalDue).toFixed(2));
  }

  selectAllFromWorkplace(flag: boolean) {
    this.allFromWorkplace = !flag;
    if (this.allFromWorkplace) {
      if (this.selectedUserCtrl.value) this.selectedUserCtrl.reset();
      if (this.selectedUserCtrl.enabled) this.selectedUserCtrl.disable();
      this.displayedColumns = ['user', 'price', "date", 'actions'];
    } else {
      if (this.selectedUserCtrl.disabled) this.selectedUserCtrl.enable();
      this.displayedColumns = ['select', 'price', "date", 'actions'];
    }
    this.selectPayingUser(null);
  }

}
