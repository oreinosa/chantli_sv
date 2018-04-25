import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
    CoreRoutingModule
  ],
  declarations: [
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    NotFoundComponent
  ],
  exports: [
    ToolbarComponent,
    MatSidenavModule,
    SidenavComponent,
  ]
})
export class CoreModule { }
