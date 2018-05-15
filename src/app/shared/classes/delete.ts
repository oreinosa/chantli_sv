import { Subject } from 'rxjs';
import { DAO } from './dao';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { takeUntil, tap, filter } from 'rxjs/operators';

export class Delete<T> implements OnInit, OnDestroy {
  public ngUnsubscribe = new Subject();
  id: string;

  constructor(
    public service: DAO<T>,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.service
      .object
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(object => object ? false : this.onBack()),
        filter(object => !!object)
      )
      .subscribe(object => this.id = object['id']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit() {
    return this.service
      .delete(this.id)
      .then(flag => this.onBack())
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}