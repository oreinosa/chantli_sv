import { Router, ActivatedRoute } from "@angular/router";
import { DAO } from "./dao";
import { NotificationsService } from "../../notifications/notifications.service";

export abstract class Add<T> {
  public object: T;

  constructor(
    public className: string,
    public service: DAO<T>,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  abstract initForm(): void;

  onSubmit(object: T) {
    console.log(object);
    return this.service
      .add(object)
      .then(flag => this.onBack())
      .then(() => this.notificationsService.show(`${this.className} agregado`, undefined, 'success'));
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}