import { Delete } from "./delete";
import { DAOSubcollection } from "./dao-subcollection";
import { Router, ActivatedRoute } from "@angular/router";

export class DeleteSubcollection<T, S> extends Delete<T> {
  subCollection: S[];
  
  constructor(
    public service: DAOSubcollection<T, S>,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(service, router, route)
  }

  ngOnInit() {
    this.service
      .object
      .takeUntil(this.ngUnsubscribe)
      .do(object => object ? false : this.onBack())
      .filter(object => !!object)
      .do(object => this.id = object['id'])
      .switchMap(() => this.service.getSubcollection(this.id))
      .takeUntil(this.ngUnsubscribe)
      .subscribe(subCollection => this.subCollection = subCollection);
  }

  onSubmit() {
    return this.service
      .delete(this.id, this.subCollection)
      .then(flag => this.onBack())
  }
}
