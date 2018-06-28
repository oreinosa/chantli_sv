import { CategoriesService } from './../categories/categories.service';
import { UploaderModule } from './../../uploader/uploader.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsService } from './products.service';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DelProductComponent } from './del-product/del-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  imports: [
    SharedModule,
    UploaderModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent,    
    AddProductComponent,
    DelProductComponent,
    EditProductComponent,
  ],
  providers: [ProductsService, CategoriesService]
})
export class ProductsModule { }
