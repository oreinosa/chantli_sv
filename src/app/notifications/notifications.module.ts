import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from './notifications.service';
import { NotificationsComponent } from './notifications.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent],
  providers: [NotificationsService]
})
export class NotificationsModule { }