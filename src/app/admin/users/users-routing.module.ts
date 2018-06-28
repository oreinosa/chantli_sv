import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DelUserComponent } from './del-user/del-user.component';


const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'agregar', component: AddUserComponent },
      { path: 'editar/:id', component: EditUserComponent },
      { path: 'borrar/:id', component: DelUserComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
