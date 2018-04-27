import { Component } from '@angular/core';
import { Workplace } from '../../../shared/classes/workplace';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkplacesService } from '../workplaces.service';
import { NotificationsService } from '../../../notifications/notifications.service';
import { Add } from '../../../shared/classes/add';

@Component({
  selector: 'app-add-workplace',
  templateUrl: './add-workplace.component.html',
  styleUrls: ['./add-workplace.component.css']
})
export class AddWorkplaceComponent extends Add<Workplace> {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public workplacesService: WorkplacesService,
    public notificationsService: NotificationsService
  ) {
    super(workplacesService, router, route, notificationsService);
  }

  initForm() {
    this.object = new Workplace();
  }

}
