import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import { FooterComponent } from './footer/footer.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    CoreRoutingModule
  ],
  exports: [
    NavComponent,
  ],
  declarations: [
    NavComponent,
    HomeComponent,
    AvatarComponent,
    FooterComponent,
    FeedbackComponent,
  ]
})
export class CoreModule { }
