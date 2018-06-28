import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { WorkplacesRoutingModule } from './workplaces-routing.module';

import { WorkplacesComponent } from './workplaces.component';
import { WorkplacesService } from './workplaces.service';
import { AddWorkplaceComponent } from './add-workplace/add-workplace.component';
import { EditWorkplaceComponent } from './edit-workplace/edit-workplace.component';
import { DelWorkplaceComponent } from './del-workplace/del-workplace.component';

@NgModule({
  imports: [
    SharedModule,
    WorkplacesRoutingModule
  ],
  declarations: [
    WorkplacesComponent,
    AddWorkplaceComponent,
    EditWorkplaceComponent,
    DelWorkplaceComponent,
  ],
  providers: [WorkplacesService]
})
export class WorkplacesModule { }
