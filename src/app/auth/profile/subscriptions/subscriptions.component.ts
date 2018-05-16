import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../messaging/messaging.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { take, tap, map } from 'rxjs/operators';
import { User } from '../../../shared/classes/user';

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
      .pipe(
        take(1),
        map((user: User) => Object.keys(user.fcmTokens)),
        tap(tokens => console.log(tokens))
      )
      .subscribe(tokens => this.tokens = tokens)
  }

  onSubmit() {
    if (this.arrivalsFlag) {
      this.messagingService.subscribeToTopic('arrival', this.tokens)
    }
  }

}
