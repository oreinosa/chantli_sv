import { OrderDetailsComponent } from './order-details/order-details.component';
import { FeedbackOrderComponent } from './feedback-order/feedback-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders.component';
import { AuthGuard } from '../auth/auth.guard';
import { CancelOrderComponent } from 'src/app/my-orders/cancel-order/cancel-order.component';

const routes: Routes = [
  {
    path: 'mis-ordenes', component: MyOrdersComponent, canActivate: [AuthGuard], children: [
      { path: 'editar/:id', component: OrderDetailsComponent },
      { path: 'editar/:id/paso/:step', component: EditOrderComponent },
      { path: 'cancelar/:id', component: CancelOrderComponent },
      { path: 'comentar/:id', component: FeedbackOrderComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule { } 
