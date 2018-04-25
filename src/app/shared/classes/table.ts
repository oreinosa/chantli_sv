import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import "rxjs/add/operator/takeUntil";

export class Table<T> implements OnInit, AfterViewInit {
  public ngUnsubscribe = new Subject();
  public displayedColumns?: string[];
  public sort?: MatSort;
  public paginator?: MatPaginator;
  public dataSource: MatTableDataSource<T> = new MatTableDataSource();
  public loaded: boolean = false;

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
        this.dataSource.data = data;
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
}