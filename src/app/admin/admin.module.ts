import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { UploaderModule } from '../uploader/uploader.module';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DelUserComponent } from './users/del-user/del-user.component';
import { UsersService } from './users/users.service';

import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';
import { CategoriesService } from './categories/categories.service';

import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { WorkplacesComponent } from './workplaces/workplaces.component';
import { WorkplacesService } from './workplaces/workplaces.service';
import { AddProductComponent } from './products/add-product/add-product.component';
import { DelProductComponent } from './products/del-product/del-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { AddMenuComponent } from './menus/add-menu/add-menu.component';
import { DelMenuComponent } from './menus/del-menu/del-menu.component';
import { EditMenuComponent } from './menus/edit-menu/edit-menu.component';
import { MenusComponent } from './menus/menus.component';
import { MenusService } from './menus/menus.service';
import { AddWorkplaceComponent } from './workplaces/add-workplace/add-workplace.component';
import { EditWorkplaceComponent } from './workplaces/edit-workplace/edit-workplace.component';
import { DelWorkplaceComponent } from './workplaces/del-workplace/del-workplace.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    UploaderModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DelUserComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent,
    ProductsComponent,
    WorkplacesComponent,
    AddProductComponent,
    DelProductComponent,
    EditProductComponent,
    AddMenuComponent,
    DelMenuComponent,
    EditMenuComponent,
    MenusComponent,
    AddWorkplaceComponent,
    EditWorkplaceComponent,
    DelWorkplaceComponent,
  ],
  providers: [UsersService, CategoriesService, ProductsService, WorkplacesService, MenusService]
})
export class AdminModule { }