import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, Sort, MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import "rxjs/add/operator/takeUntil";
import { AddDialogComponent } from '../../admin/dialogs/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../../admin/dialogs/edit-dialog/edit-dialog.component';
import { DelDialogComponent } from '../../admin/dialogs/del-dialog/del-dialog.component';

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
    private dialog: MatDialog
  ) { }

  onAction(actionName: string, object: T) {
    console.log('action ', object);
    this.service.object.next(object);
    let template: any;
    switch (actionName) {
      case "add":
        template = AddDialogComponent;
        break;
      case "edit":
        template = EditDialogComponent;
        break;
      case "del":
        template = DelDialogComponent;
        break;
    }
    this.dialog.open(template);
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