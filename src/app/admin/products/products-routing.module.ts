import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DelProductComponent } from './del-product/del-product.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      { path: 'agregar', component: AddProductComponent },
      { path: 'editar/:id', component: EditProductComponent },
      { path: 'borrar/:id', component: DelProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
