import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import { OnInit, OnDestroy } from '@angular/core';

export abstract class Edit<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  object: T;

  constructor(
    public service: DAO<T>,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.service
      .object
      .takeUntil(this.ngUnsubscribe)
      .do((object: T) => !!object ? false : this.onBack('../'))
      // .do(object => console.log(object))
      .subscribe(object => this.object = object, e => this.onBack('../'));
  }

  ngOnDestroy() {
    // this.service.objectSubject.next(null);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(object: T) : Promise<void> {
    const id = this.object['id'];
    return this.service
      .update(id, object)
      .then(flag => this.onBack('../'))
      .then();
  }

  onBack(noId: string = '') {
    this.router.navigate([`../${noId}`], { relativeTo: this.route });
  }
}