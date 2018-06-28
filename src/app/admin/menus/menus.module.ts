import { ProductsService } from './../products/products.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { DelMenuComponent } from './del-menu/del-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { MenusComponent } from './menus.component';
import { MenusService } from './menus.service';
import { MenusRoutingModule } from './menus-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MenusRoutingModule
  ],
  declarations: [
    AddMenuComponent,
    DelMenuComponent,
    EditMenuComponent,
    MenusComponent,
  ],
  providers: [MenusService, ProductsService]
})
export class MenusModule { }
