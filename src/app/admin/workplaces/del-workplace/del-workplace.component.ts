import { Component } from '@angular/core';
import { Delete } from '../../../shared/classes/delete';
import { Workplace } from '../../../shared/classes/workplace';
import { WorkplacesService } from '../workplaces.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../notifications/notifications.service';

@Component({
  selector: 'app-del-workplace',
  templateUrl: './del-workplace.component.html',
  styleUrls: ['./del-workplace.component.css']
})
export class DelWorkplaceComponent extends Delete<Workplace> {
  constructor(
    public workplacesService: WorkplacesService,
    public router: Router,
    public route: ActivatedRoute,
    public notificationsService: NotificationsService
  ) {
    super(workplacesService, router, route, notificationsService);
  }

}
