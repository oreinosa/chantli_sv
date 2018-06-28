import { WorkplacesModule } from './workplaces/workplaces.module';
import { CategoriesModule } from './categories/categories.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersModule } from 'src/app/admin/users/users.module';
import { ProductsModule } from 'src/app/admin/products/products.module';
import { MenusModule } from 'src/app/admin/menus/menus.module';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'usuarios', loadChildren: () => UsersModule },
      { path: 'categorias', loadChildren: () => CategoriesModule },
      { path: 'lugares-de-trabajo', loadChildren: () => WorkplacesModule },
      { path: 'productos', loadChildren: () => ProductsModule },
      { path: 'menus', loadChildren: () => MenusModule },
      { path: '', pathMatch: 'full', redirectTo: 'menus' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
