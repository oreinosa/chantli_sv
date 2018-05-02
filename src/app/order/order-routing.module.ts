import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { Step1Component } from './new-order/step-1/step-1.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  { path: 'menu', component: WeekMenuComponent },
  { path: 'nueva-orden', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'nueva-orden/:id/:step', component: NewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
