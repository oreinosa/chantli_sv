import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { AuthGuard } from '../auth/auth.guard';
import { WorkplaceGuard } from '../auth/workplace.guard';

const routes: Routes = [
  { path: 'menu', component: WeekMenuComponent },
  { path: 'nueva-orden', pathMatch: 'full', redirectTo: 'menu', canActivate: [AuthGuard, WorkplaceGuard] },
  { path: 'nueva-orden/:id/:step', component: NewOrderComponent , canActivate: [AuthGuard, WorkplaceGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
