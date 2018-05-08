import { Component, OnInit } from '@angular/core';
import { Table } from '../../shared/classes/table';
import { Workplace } from '../../shared/classes/workplace';
import { WorkplacesService } from './workplaces.service';

@Component({
  selector: 'app-workplaces',
  templateUrl: './workplaces.component.html',
  styleUrls: ['./workplaces.component.css']
})
export class WorkplacesComponent  extends Table<Workplace>  {
  public displayedColumns = ['name', 'actions'];

  constructor(
    public workplacesService: WorkplacesService,
  ) {
    super(workplacesService);
  }

}
