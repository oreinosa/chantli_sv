import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import "rxjs/add/operator/takeUntil";

export class Table<T> implements OnInit, AfterViewInit {
  public ngUnsubscribe = new Subject();
  public displayedColumns?: string[];
  // public sort?: MatSort;
  // public paginator?: MatPaginator;
  public data: T[];
  public dataSource: MatTableDataSource<T> = new MatTableDataSource();
  public loaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: DAO<T>,
  ) { }

  onAction(object: T) {
    console.log('action ', object);
    this.service.object.next(object);
  }

  ngOnInit() {
    // this.service.objectSubject.next(null);
    console.log('init table');
    this.service
      .getAll()
      .takeUntil(this.ngUnsubscribe)
      .do(data => console.log('Table data : ', data))
      .subscribe(data => {
        this.loaded = false;
        this.data = data;
        this.dataSource.data.length ? this.sortData(this.sort) : this.sortData(null);
        this.loaded = true;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // console.log('destroy table');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortData(sort: Sort) {
    this.dataSource.data = this.data.slice();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}