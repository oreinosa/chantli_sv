import { NgModule } from '@angular/core';

import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { MyOrdersComponent } from './my-orders.component';

import { MyOrdersService } from './my-orders.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MyOrdersRoutingModule
  ],
  declarations: [MyOrdersComponent],
  providers: [MyOrdersService]
})
export class MyOrdersModule { }
