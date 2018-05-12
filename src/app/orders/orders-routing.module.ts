import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { PackageComponent } from './package/package.component';

const routes: Routes = [
  {
    path: 'ordenes', component: OrdersComponent, children: [
      { path: 'empacar', component: PackageComponent },
      { path: 'pagar', component: PaymentComponent },
      { path: '', pathMatch: 'full', redirectTo: 'empacar' },
      { path: '**', redirectTo: 'empacar', }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
