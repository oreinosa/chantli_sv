import { DelCategoryComponent } from './del-category/del-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from 'src/app/admin/categories/categories.component';
import { EditCategoryComponent } from 'src/app/admin/categories/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
      { path: 'agregar', component: AddCategoryComponent },
      { path: 'editar/:id', component: EditCategoryComponent },
      { path: 'eliminar/:id', component: DelCategoryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
