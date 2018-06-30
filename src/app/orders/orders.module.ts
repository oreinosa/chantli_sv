import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import { PackageComponent } from './package/package.component';
import { PaymentComponent } from './payment/payment.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { FiltersComponent } from './filters/filters.component';
import { OrdersModeComponent } from './orders-mode/orders-mode.component';
import { WorkplacesService } from 'src/app/admin/workplaces/workplaces.service';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    PackageComponent,
    PaymentComponent,
    FiltersComponent,
    OrdersModeComponent,
    OrdersOverviewComponent
  ],
  providers: [OrdersService, WorkplacesService]
})
export class OrdersModule { }
