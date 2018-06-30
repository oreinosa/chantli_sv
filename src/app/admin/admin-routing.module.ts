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
      { path: 'usuarios', loadChildren: 'src/app/admin/users/users.module#UsersModule' },
      { path: 'categorias', loadChildren: 'src/app/admin/categories/categories.module#CategoriesModule' },
      { path: 'lugares-de-trabajo', loadChildren: 'src/app/admin/workplaces/workplaces.module#WorkplacesModule' },
      { path: 'productos', loadChildren: 'src/app/admin/products/products.module#ProductsModule' },
      { path: 'menus', loadChildren: 'src/app/admin/menus/menus.module#MenusModule' },
      { path: '', pathMatch: 'full', redirectTo: 'menus' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
