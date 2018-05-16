import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../messaging/messaging.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  menuFlag: boolean;
  arrivalsFlag: boolean;
  subscriptions: Subscription;
  tokens: any;
  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService
      .user
      .pipe(take(1), tap(user => console.log(user.fcmTokens)))
      .subscribe(user => this.tokens = user.fcmTokens)
  }

  onSubmit() {
    if (this.arrivalsFlag) {
      // this.messagingService.subscribeToTopic('arrival', this.tokens)
    }
  }

}
