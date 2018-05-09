import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { OrdersService } from '../orders.service';
import { User } from '../../shared/classes/user';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Workplace } from '../../shared/classes/workplace';
import { WorkplacesService } from '../../admin/workplaces/workplaces.service';
import { Order } from '../../shared/classes/order';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['user', 'products', "date", 'actions'];
  public dataSource = new MatTableDataSource<Order>();

  today = new Date();

  selectedDate: string = 'Para ahora';

  dateFilter: BehaviorSubject<{ from: Date, to: Date }>;
  workplaces: Workplace[];

  allUsers: User[];
  users: User[];
  filteredUsers: Observable<User[]>;

  userCtrl: FormControl = new FormControl('');
  workplaceCtrl: FormControl = new FormControl('TELUS International');

  allOrders: Order[];

  constructor(
    private ordersService: OrdersService,
    private workplacesService: WorkplacesService
  ) {

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

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
      .do(orders => console.log('Orders : ', orders))
      .map(orders => orders.sort((a, b) => this.compare(a.products.principal, b.products.principal, true)))
      .map(orders => orders.sort((a, b) => this.compare(a.date.by, b.date.by, false)))
      .map(orders => orders.sort((a, b) => this.compare(a.date.for, b.date.for, false)))
      .subscribe(orders => {
        this.allOrders = orders;
        this.dataSource.data = orders;
        this.applyFilter();
      });
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // ngAfterViewInit() {
  // }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  applyFilter() {
    this.filterByWorkplace();
    this.filterByUser();
  }

  filterByUser() {
    let name = this.userCtrl.value;
    console.log(`Filter by user : `, name)
    this.dataSource.filterPredicate =
      (data: Order, filter: string) => data.user.name === filter; // CHECK IF NAME IS EQUAL TO FILTER VALUE

    this.dataSource.filter = name;
  }

  filterByWorkplace() {
    // let workplace = this.workplaceCtrl.value;
    // console.log(`Filter by workplace : ${workplace}`)
    // this.dataSource.filterPredicate =
    //   (data: Order, filter: string) => data.user.workplace === filter; // CHECK IF NAME IS EQUAL TO FILTER VALUE

    // this.dataSource.filter = workplace;
    let workplace = this.workplaceCtrl.value;
    console.log(`Filter by workplace : ${workplace}`);
    this.dataSource.data = this.allOrders.slice().filter(order => order.user.workplace === workplace);
    this.users = this.allUsers.slice().filter(user => user.workplace === workplace);
    this.userCtrl.setValue("");
  }

  selectDate(range: string) {
    let from = new Date();
    let to = new Date();

    switch (range) {
      case "today":
        from.setUTCHours(11, 0, 0);
        to.setUTCHours(13, 0, 0);
        this.selectedDate = `Para ahora `;
        break;
      case "week":
        from = this.getMonday();
        to = this.getFriday();
        this.selectedDate = `Esta semana (${from.toLocaleString()} al ${to.toLocaleString()})`;
        break;
      case "month":
        from = this.getFirstDayMonth();
        to = this.getLastDayMonth();
        this.selectedDate = `Para este mes`;
        break;
    }
    this.dateFilter.next({ from, to });
  }

  filterUsers(name: string): User[] {
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
}
