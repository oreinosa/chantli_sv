import { FeedbackComponent } from './../core/feedback/feedback.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders.component';
import { AuthGuard } from '../auth/auth.guard';
import { CancelOrderComponent } from 'src/app/my-orders/cancel-order/cancel-order.component';

const routes: Routes = [
  {
    path: 'mis-ordenes', component: MyOrdersComponent, canActivate: [AuthGuard], children: [
      { path: 'editar/:id', component: EditOrderComponent },
      { path: 'cancelar/:id', component: CancelOrderComponent },
      { path: 'comentario/:id', component: FeedbackComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule { } 
