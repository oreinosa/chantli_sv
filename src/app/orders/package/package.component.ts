import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['user', 'products', 'actions'];
  public dataSource = new MatTableDataSource<Order>();

  today = new Date();

  workplaces: Workplace[];

  users: User[];
  filteredUsers: Observable<User[]>;

  userCtrl: FormControl = new FormControl('');
  workplaceCtrl: FormControl = new FormControl('TELUS International');



  constructor(
    private ordersService: OrdersService,
    private workplacesService: WorkplacesService
  ) {

  }

  ngOnInit() {
    this.ordersService
      .getUsers()
      .take(1)
      .do(users => console.log(users))
      .subscribe(users => this.users = users);

    this.workplacesService
      .getAll()
      .take(1)
      .do(workplaces => console.log(workplaces))
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

    this.ordersService
      .getOrders(from, to)
      // .getOrders()
      .takeUntil(this.ngUnsubscribe)
      .do(orders => console.log(orders))
      .map(orders => orders.sort((a, b) => this.compare(a.products.principal, b.products.principal, true)))
      .subscribe(orders => {
        this.dataSource.data = orders;
        this.filterByUser(this.userCtrl.value);
        this.filterByWorkplace(this.workplaceCtrl.value);
      });
  }

  private compare(a, b, isAsc) {
    if (a == b) {
      return 0;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  filterByUser(name: string) {
    console.log(`Filter by user : `, name)
    this.dataSource.filterPredicate =
      (data: Order, filter: string) => data.user.name === filter; // CHECK IF NAME IS EQUAL TO FILTER VALUE

    this.dataSource.filter = name;
  }

  filterByWorkplace(workplace: string) {
    console.log(`Filter by workplace : ${workplace}`)
    this.dataSource.filterPredicate =
      (data: Order, filter: string) => data.user.workplace === filter; // CHECK IF NAME IS EQUAL TO FILTER VALUE

    this.dataSource.filter = workplace
  }


  filterUsers(name: string): User[] {
    return this.users.filter(user =>
      user.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
