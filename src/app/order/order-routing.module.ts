import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { AuthGuard } from '../auth/auth.guard';
import { WorkplaceGuard } from '../auth/workplace.guard';
import { DOW } from '../shared/classes/daysOfTheWeek';

const routes: Routes = [
  { path: 'menu', component: OrderComponent },
  { path: 'menu/nueva-orden/:id', pathMatch: 'full', redirectTo: 'menu/nueva-orden/:id/paso/1' },
  { path: 'menu/nueva-orden/:id/paso/:step', component: NewOrderComponent, canActivate: [AuthGuard, WorkplaceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {

}
