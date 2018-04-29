import { Subject } from 'rxjs/Subject';
import { DAO } from './dao';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from '../../notifications/notifications.service';

export class Delete<T> implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  id: string;

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
      .do(object => object ? false : this.onBack())
      .filter(object => !!object)
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
      .then(() => this.notificationsService.show(`${this.service['className']} borrado`, undefined, 'danger'));;
  }

  onBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}