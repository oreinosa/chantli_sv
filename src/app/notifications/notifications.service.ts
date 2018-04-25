import { Subject } from 'rxjs/Subject';
import { Notification } from './notification';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
  notificationSubject = new Subject<{ notification: Notification, timeout: number }>();

  constructor(
  ) {
    console.log('notifications service');
  }

  show(body: string, title: string = 'Notification!', type: string = 'info', timeout: number = 4500) {
    let icon, background;
    switch (type) {
      case 'info':
        icon = 'info_outline';
        background = 'info lighten';
        break;
      case 'success':
        icon = 'check_circle';
        background = 'success lighten';
        break;
      case 'danger':
        icon = 'sms_failed';
        background = 'danger lighten';
        break;
      case 'warning':
        icon = 'sms_failed';
        background = 'warning lighten';
        break;
    }
    const notification = new Notification(title, body, background, icon);
    this.notificationSubject.next({
      notification: notification,
      timeout: timeout
    });
  }

}
