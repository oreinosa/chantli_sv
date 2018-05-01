import { Add } from "./add";
import { Router, ActivatedRoute } from "@angular/router";
import { DAOSubcollection } from "./dao-subcollection";

export abstract class AddSubcollection<T, S> extends Add<T>{
  selectedSubcollectionObjects: S[] = [];
  selectedSubcollectionObject: S;
  refresh: boolean;

  constructor(
    public service: DAOSubcollection<T, S>,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(service, router, route);
  }

  onSubmit(object: T) {
    console.log(object);
    console.log(this.selectedSubcollectionObjects);
    return this.service
      .add(object, this.selectedSubcollectionObjects)
      .then(flag => this.onBack())
  }

  addToSubcollection() {
    this.selectedSubcollectionObjects.push(this.selectedSubcollectionObject);
    this.selectedSubcollectionObject = null;
    this.refresh = !this.refresh;
  }

  removeFromSubcollection(id: string) {
    let index = this.selectedSubcollectionObjects.findIndex(product => product['id'] === id);
    this.selectedSubcollectionObjects.splice(index, 1);
    this.refresh = !this.refresh;
  }
}
