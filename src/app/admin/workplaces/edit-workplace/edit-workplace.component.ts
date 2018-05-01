import { Component, } from '@angular/core';
import { Edit } from '../../../shared/classes/edit';
import { Workplace } from '../../../shared/classes/workplace';
import { WorkplacesService } from '../workplaces.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-workplace',
  templateUrl: './edit-workplace.component.html',
  styleUrls: ['./edit-workplace.component.css']
})
export class EditWorkplaceComponent extends Edit<Workplace> {
  constructor(
    public workplacesService: WorkplacesService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    super(workplacesService, router, route);
  }
}
