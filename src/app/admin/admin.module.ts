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
  ],
  providers: [UsersService, CategoriesService, ProductsService, WorkplacesService]
})
export class AdminModule { }