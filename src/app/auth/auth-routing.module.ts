import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionsComponent } from './profile/subscriptions/subscriptions.component';
import { InformationComponent } from './profile/information/information.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'ingresar', component: SignInComponent },
  { path: 'registrarse', component: SignUpComponent },
  { path: 'reset-password', component: ForgotPasswordComponent},
  {
    path: 'perfil', component: ProfileComponent, children: [
      { path: 'info', component: InformationComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'info' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
