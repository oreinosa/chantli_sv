import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import { PackageComponent } from './package/package.component';
import { PaymentComponent } from './payment/payment.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OrdersRoutingModule
  ],
  declarations: [OrdersComponent, PackageComponent, PaymentComponent],
  providers: [OrdersService]
})
export class OrdersModule { }
