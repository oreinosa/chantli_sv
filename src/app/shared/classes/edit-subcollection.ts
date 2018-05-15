import { Edit } from "./edit";
import { Router, ActivatedRoute } from "@angular/router";
import { DAOSubcollection } from "./dao-subcollection";
import { OnInit, OnDestroy } from "@angular/core";
import { takeUntil, tap, filter, switchMap } from "rxjs/operators";

export class EditSubcollection<T, S> extends Edit<T> implements OnInit, OnDestroy {
  refresh: boolean;

  selectedSubcollectionObjects: S[] = [];
  deletedSubcollectionObjects: S[] = [];
  selectedSubcollectionObject: S;

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
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(object => this.object = object),
        tap((object: T) => !!this.object ? false : this.onBack('../')),
        filter(object => !!object),
        switchMap(() => this.service.getSubcollection(this.object['id'])),
        takeUntil(this.ngUnsubscribe),
        tap(subCollection => console.log(subCollection))
      )
      .subscribe(subCollection => this.object[this.service.subCollectionName] = subCollection.slice());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSubmit(object: T): Promise<void> {
    // console.log(this.selectedSubcollectionObjects);
    return this.service
      .update(this.object['id'], object, this.selectedSubcollectionObjects, this.deletedSubcollectionObjects)
      .then(flag => this.onBack('../'))
  }

  addToSubcollection() {
    this.selectedSubcollectionObjects.push(this.selectedSubcollectionObject);
    this.selectedSubcollectionObject = null;
    this.refresh = !this.refresh;
  }

  removeFromSubcollection(id: string) {
    let subcollectionName = this.service.subCollectionName;
    let objectSubcollection = this.object[subcollectionName];
    let index = objectSubcollection.findIndex(product => product.id === id);
    if (index >= 0) {
      let removedProduct = objectSubcollection[index];
      // console.log(`Removed ${removedProduct['name']}(id: ${removedProduct['id']}) (index : ${index} from object`);
      this.deletedSubcollectionObjects.push(removedProduct);
      objectSubcollection.splice(index, 1);
    }
    index = this.selectedSubcollectionObjects.findIndex(product => product['id'] === id);
    if (index >= 0) {
      let removedProduct = this.selectedSubcollectionObjects[index];
      // console.log(`Removed ${removedProduct['name']}(id: ${removedProduct['id']}) (index : ${index} from selected`);
      this.selectedSubcollectionObjects.splice(index, 1);
    }
    this.refresh = !this.refresh;
  }
}
