import { MenusComponent } from './menus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMenuComponent } from './add-menu/add-menu.component';
import { DelMenuComponent } from './del-menu/del-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

const routes: Routes = [
  {
    path: '', component: MenusComponent,
    children: [
      { path: 'agregar', component: AddMenuComponent },
      { path: 'editar/:id', component: EditMenuComponent },
      { path: 'borrar/:id', component: DelMenuComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
