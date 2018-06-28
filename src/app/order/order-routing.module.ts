import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { AuthGuard } from '../auth/auth.guard';
import { WorkplaceGuard } from '../auth/workplace.guard';
import { DOW } from '../shared/classes/daysOfTheWeek';

const today = new Date();
const dow = today.getDay();
const day = DOW[dow].toLowerCase();

const routes: Routes = [
  { path: 'menu', pathMatch: 'full', redirectTo: `menu/${day}` },
  { path: 'menu/:day', component: OrderComponent },
  { path: 'nueva-orden', pathMatch: 'full', redirectTo: 'menu', canActivate: [AuthGuard, WorkplaceGuard] },
  { path: 'nueva-orden/:id/paso/:step', component: NewOrderComponent, canActivate: [AuthGuard, WorkplaceGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {

}
