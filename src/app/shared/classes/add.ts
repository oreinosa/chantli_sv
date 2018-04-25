import { Router, ActivatedRoute } from "@angular/router";
import { DAO } from "./dao";

export abstract class Add<T> {
  public object: T;

  constructor(
    public service: DAO<T>,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  abstract initForm(): void;

  onSubmit(object: T) {
    console.log(object);
    return this.service
      .add(object)
      .then(flag => this.onBack());
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}