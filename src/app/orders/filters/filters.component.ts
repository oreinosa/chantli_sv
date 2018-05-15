import { OnDestroy } from '@angular/core';
import { Order } from './../../shared/classes/order';
import { MatTableDataSource } from '@angular/material';
import { DateRange } from './../../shared/classes/date-range';
import { startWith, map, takeUntil, take, switchMap, tap } from 'rxjs/operators';
import { WorkplacesService } from './../../admin/workplaces/workplaces.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Workplace } from './../../shared/classes/workplace';
import { User } from './../../shared/classes/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersService } from '../orders.service';
import { MONTHS } from '../../shared/classes/months';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  today = new Date();
  months = MONTHS;

  workplaces: Workplace[];

  allUsers: User[];
  users: User[];

  filteredUsers: Observable<User[]>;

  // dateFilter: BehaviorSubject<DateRange>;
  monthFilter: BehaviorSubject<number>;

  selectedUserCtrl: FormControl = new FormControl('');
  selectedWorkplace: string = 'TELUS International';
  selectedMonth: number;
  selectedYear: number;
  includeCancelados: boolean;

  allOrders: Order[];
  filteredOrders: Order[];

  selectedRange = 'today';

  @Output('selectedRange') selectRangeEmitter = new EventEmitter<string>();


  constructor(
    private ordersService: OrdersService,
    private workplacesService: WorkplacesService,

  ) { }

  ngOnInit() {
    let currentYear = this.today.getFullYear();
    let currentMonth = this.today.getMonth();
    this.selectedMonth = currentMonth;
    this.selectedYear = currentYear;

    this.ordersService
      .getUsers()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      // .do(users => console.log(users))
      .subscribe(users => this.allUsers = users);

    this.workplacesService
      .getAll()
      .pipe(
        take(1)
      )
      // .do(workplaces => console.log(workplaces))
      .subscribe(workplaces => this.workplaces = workplaces);

    this.filteredUsers = this.selectedUserCtrl
      .valueChanges
      .pipe(
        startWith(''),
        map(user => user ? this.filterUsers(user) : this.users.slice())
      );

    this.monthFilter = new BehaviorSubject(currentMonth);

    this.monthFilter
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map(month => {
          let dateRange: DateRange = {
            from: this.getFirstDayMonth(month),
            to: this.getLastDayMonth(month)
          };
          return dateRange;
        }),
        switchMap(({ from, to }) => this.ordersService.getOrders(from, to)),
        takeUntil(this.ngUnsubscribe),
        // .map(orders => orders.sort((a, b) => this.compare(a.date.by, b.date.by, false))),
        // .map(orders => orders.sort((a, b) => this.compare(a.date.for, b.date.for, false))),
        // .map(orders => orders.sort((a, b) => this.compare(a.products.principal, b.products.principal, true))),
        tap(orders => console.log('Orders : ', orders))
      )
      
      .subscribe(orders => {
        this.allOrders = orders;
        this.applyFilters();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selectUser() {
    let userName = this.selectedUserCtrl.value;
    if (!userName) {
      this.ordersService.payingUser.next(null);
      return;
    }
    console.log(userName, ' is paying now')
    let user = this.filterUsers(userName)[0];
    this.ordersService.payingUser.next(user);
  }

  selectMonth() {
    let month = this.selectedMonth;
    this.monthFilter.next(month);
  }

  applyFilters() {
    this.filterByWorkplace();
    this.filterByUser();
    this.filterByDateRange();
    this.filterByCancelado();
    this.ordersService.filterOrders(this.filteredOrders);
  }

  filterByWorkplace() {
    let workplace = this.selectedWorkplace;
    // console.log(`Filter by workplace : ${workplace}`);
    let orders = this.allOrders.slice();
    this.filteredOrders = orders.filter(order => order.user.workplace === workplace);
    let users = this.allUsers.slice();
    this.users = users.filter(user => user.workplace === workplace);
    this.selectedUserCtrl.setValue(this.selectedUserCtrl.value);
  }

  filterByUser() {
    let name = this.selectedUserCtrl.value;
    if (name) {
      // console.log(`Filter by user : `, name);
      this.filteredOrders = this.filteredOrders.filter(order => order.user.name === name);
    }
  }

  filterByDateRange() {
    let dateRange = this.selectedRange;
    let from = new Date();
    let to = new Date();
    let rangeString: string;
    // console.log(`Filter by dateRange : `, dateRange);

    switch (dateRange) {
      case "today":
        from.setHours(0, 0, 0);
        to.setHours(22, 0, 0);
        rangeString = `Para ahora `;
        break;
      case "week":
        from = this.getMonday();
        to = this.getFriday();
        rangeString = `Para la semana (${from.toLocaleDateString()} al ${to.toLocaleDateString()})`;
        break;
      case "month":
        from = this.getFirstDayMonth();
        to = this.getLastDayMonth();
        rangeString = `Para el mes`;
        break;
    }
    // console.log(from, to);
    this.filteredOrders = this.filteredOrders.filter(order => order.date.for >= from && order.date.for <= to);
    this.selectRangeEmitter.emit(rangeString);
  }

  filterByCancelado() {
    if (!this.includeCancelados) {
      this.filteredOrders = this.filteredOrders.filter(order => order.status !== 'Cancelado');
    }
  }

  private filterUsers(name: string): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


  private getMonday(): Date {
    let d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + 1;
    if (day == 6) {
      diff += 7;
    }
    d.setDate(diff);
    d.setUTCHours(11, 0, 0);
    // console.log(d);
    return d;
  }

  private getFriday(): Date {
    let d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + 5;
    if (day == 6) diff += 7;
    d.setDate(diff);
    d.setUTCHours(13, 0, 0);
    // console.log(d);
    return d;
  }

  private getFirstDayMonth(month?: number): Date {
    let d = new Date();
    // month ? d.setMonth(month) : false;
    // d.setDate(1);
    let _month = month ? month : d.getMonth();
    let year = this.selectedYear;
    d.setFullYear(year, _month, 1);
    d.setUTCHours(1, 0, 0);
    // console.log(d);
    return d;
  }


  private getLastDayMonth(month?: number): Date {
    let d = new Date();
    let _month = month ? month : d.getMonth();
    let year = this.selectedYear;
    d.setFullYear(year, _month + 1, 0);
    d.setUTCHours(24, 0, 0);
    // console.log(d);
    return d;
  }


}
