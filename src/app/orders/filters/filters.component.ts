import { Order } from './../../shared/classes/order';
import { MatTableDataSource } from '@angular/material';
import { DateRange } from './../../shared/classes/date-range';
import { startWith } from 'rxjs/operators/startWith';
import { WorkplacesService } from './../../admin/workplaces/workplaces.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Workplace } from './../../shared/classes/workplace';
import { User } from './../../shared/classes/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrdersService } from '../orders.service';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  today = new Date();

  workplaces: Workplace[];
  allUsers: User[];
  users: User[];

  filteredUsers: Observable<User[]>;

  dateFilter: BehaviorSubject<DateRange>;
  userCtrl: FormControl = new FormControl('');
  workplaceCtrl: FormControl = new FormControl('TELUS International');

  allOrders: Order[];
  filteredOrders: Order[];

  selectedRange = 'today';

  @Output('selectedRange') selectRangeEmitter = new EventEmitter<string>();


  constructor(
    private ordersService: OrdersService,
    private workplacesService: WorkplacesService,

  ) { }

  ngOnInit() {

    this.ordersService
      .getUsers()
      .take(1)
      // .do(users => console.log(users))
      .subscribe(users => this.allUsers = users);

    this.workplacesService
      .getAll()
      .take(1)
      // .do(workplaces => console.log(workplaces))
      .subscribe(workplaces => this.workplaces = workplaces);

    this.filteredUsers = this.userCtrl
      .valueChanges
      .pipe(
      startWith(''),
      map(user => user ? this.filterUsers(user) : this.users.slice())
      );

    let from = new Date();
    from.setUTCHours(10, 0, 0);
    let to = new Date();
    to.setUTCHours(13, 0, 0);

    console.log(from, to);

    this.dateFilter = new BehaviorSubject({ from, to });

    this.dateFilter
      .takeUntil(this.ngUnsubscribe)
      .switchMap(({ from, to }) => this.ordersService.getOrders(from, to))
      .takeUntil(this.ngUnsubscribe)
      .map(orders => orders.sort((a, b) => this.compare(a.products.principal, b.products.principal, true)))
      .map(orders => orders.sort((a, b) => this.compare(a.date.by, b.date.by, false)))
      .map(orders => orders.sort((a, b) => this.compare(a.date.for, b.date.for, false)))
      .do(orders => console.log('Orders : ', orders))
      .subscribe(orders => {
        this.allOrders = orders;
        this.applyFilters();
      });
  }

  applyFilters() {
    this.filterByWorkplace();
    this.filterByUser();
    this.filterOrders();
  }

  filterOrders() {
    this.ordersService.filteredOrders.next(this.filteredOrders);
  }

  filterByWorkplace() {
    let workplace = this.workplaceCtrl.value;
    console.log(`Filter by workplace : ${workplace}`);
    let orders = this.allOrders.slice();
    this.filteredOrders = orders.filter(order => order.user.workplace === workplace);
    let users = this.allUsers.slice();
    this.users = users.filter(user => user.workplace === workplace);
  }

  filterByUser() {
    let name = this.userCtrl.value;
    if (name) {
      console.log(`Filter by user : `, name);
      this.filteredOrders = this.filteredOrders.filter(order => order.user.name === name);
    }
  }

  selectDate(range: string) {
    let from = new Date();
    let to = new Date();
    this.selectedRange = range;
    let rangeString: string;
    switch (range) {
      case "today":
        from.setUTCHours(11, 0, 0);
        to.setUTCHours(13, 0, 0);
        rangeString = `Para ahora `;
        break;
      case "week":
        from = this.getMonday();
        to = this.getFriday();
        rangeString = `Esta semana (${from.toLocaleString()} al ${to.toLocaleString()})`;
        break;
      case "month":
        from = this.getFirstDayMonth();
        to = this.getLastDayMonth();
        rangeString = `Para este mes`;
        break;
    }
    this.selectRangeEmitter.emit(rangeString);
    this.dateFilter.next({ from, to });
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
    if (day == 6 || day == 0) {
      // diff += day == 6 ? 3 : 7;
    }
    d.setDate(diff);
    d.setUTCHours(13, 0, 0);
    // console.log(d);
    return d;
  }

  private getFirstDayMonth(): Date {
    let d = new Date();
    d.setDate(1);
    d.setUTCHours(13, 0, 0);
    return d;
  }


  private getLastDayMonth(): Date {
    let d = new Date();
    d.setFullYear(d.getFullYear(), d.getMonth() + 1, 0)
    d.setUTCHours(13, 0, 0);
    return d;
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
