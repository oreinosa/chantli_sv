import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingService } from './messaging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [MessagingService]
})
export class MessagingModule { }
