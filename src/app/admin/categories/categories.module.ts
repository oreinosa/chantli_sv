import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { CategoriesComponent } from './categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DelCategoryComponent } from './del-category/del-category.component';
import { CategoriesService } from './categories.service';

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ],
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent,
  ],
  providers: [CategoriesService]
})
export class CategoriesModule { }
