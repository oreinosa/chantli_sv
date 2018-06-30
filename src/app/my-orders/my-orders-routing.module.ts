import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'mis-ordenes', component: MyOrdersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule { } 
