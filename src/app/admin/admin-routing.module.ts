import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DelUserComponent } from './users/del-user/del-user.component';

import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';

import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {
        path: 'usuarios', component: UsersComponent, children: [
          { path: 'agregar', component: AddUserComponent },
          { path: 'editar/:id', component: EditUserComponent },
          { path: 'borrar/:id', component: DelUserComponent }
        ]
      },
      {
        path: 'categorias', component: CategoriesComponent, children: [
          { path: 'agregar', component: AddCategoryComponent },
          { path: 'editar/:id', component: EditCategoryComponent },
          { path: 'borrar/:id', component: DelCategoryComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
