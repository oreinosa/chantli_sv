import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkplacesComponent } from './workplaces.component';
import { AddWorkplaceComponent } from './add-workplace/add-workplace.component';
import { EditWorkplaceComponent } from './edit-workplace/edit-workplace.component';
import { DelWorkplaceComponent } from './del-workplace/del-workplace.component';

const routes: Routes = [
  {
    path: '', component: WorkplacesComponent,
    children: [
      { path: 'agregar', component: AddWorkplaceComponent },
      { path: 'editar/:id', component: EditWorkplaceComponent },
      { path: 'borrar/:id', component: DelWorkplaceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkplacesRoutingModule { }
