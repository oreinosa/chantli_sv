import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { DAO } from './dao';
import { takeUntil, tap } from 'rxjs/operators';

export class Table<T> implements OnInit {
  public ngUnsubscribe = new Subject();
  public displayedColumns?: string[];
  public data: T[];
  public dataSource: MatTableDataSource<T> = new MatTableDataSource();
  public loaded: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public service: DAO<T>,
    // private dialog: MatDialog
  ) {
  }

  onAction(object: T = null, actionName?: string) {
    // console.log('action ', object);
    this.service.object.next(object);
    setTimeout(() => {
      window.scroll({
        top: 150,
        behavior: 'smooth'
      });
    }, 2);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log('init table');
    this.service
      .getAll()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(data => this.loaded = false)
      )
      .subscribe(data => {
        console.log('Table data : ', data)
        this.data = data;
        this.loaded = true;
        this.sortData();
      });
  }

  ngOnDestroy() {
    // console.log('destroy table');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  sortData() {
    this.dataSource.data = this.data;
  }

  // sortData() {
  //   console.log('sort data');
  //   const data = this.data.slice();
  //   if (!this.sort.active || this.sort.direction == '') {
  //     this.dataSource.data = this.data;
  //     return;
  //   }

  //   this.dataSource.data = data.sort((a, b) => {
  //     let isAsc = this.sort.direction == 'asc';
  //     switch (this.sort.active) {
  //       case 'name': return this.compare(a.name, b.name, isAsc);
  //       case 'category': return this.compare(a.category, b.category, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}