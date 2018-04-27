import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeUntil';
import { OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../../notifications/notifications.service';

export abstract class Edit<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  public object: T;

  constructor(
    public service: DAO<T>,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
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

  onSubmit(object: T): Promise<void> {
    const id = this.object['id'];
    return this.service
      .update(id, object)
      .then(flag => this.onBack('../'))
      .then(() => this.notificationsService.show(`${this.service['className']} editado`, undefined, 'info'));
  }

  onBack(noId: string = '') {
    this.router.navigate([`../${noId}`], { relativeTo: this.route });
  }
}