import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
require("firebase/functions");
import { Subject } from 'rxjs/Subject';
import { User } from '../shared/classes/user';
@Injectable()
export class MessagingService {

  private messaging = firebase.messaging();
  
  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(private afs: AngularFirestore) { }
  // get permission to send messages
  getPermission(user: User) {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        this.saveToken(user, token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  // Listen for token refresh
  monitorRefresh(user: User) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.');
          this.saveToken(user, refreshedToken)
        })
        .catch(err => console.log(err, 'Unable to retrieve new token'))
    });
  }

  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log('Message received. ', payload);
      this.messageSource.next(payload)
    });

  }

  subscribeToTopic(topic: string, tokens: string[]){
    const _subscribeToTopic = firebase.functions().httpsCallable('subscribeToTopic');

    return _subscribeToTopic({topic: topic, tokens: tokens})
    .then((a) => console.log(a))
    .catch(e => console.log(e));
  }

  // save the permission token in firestore
  private saveToken(user: User, token: string): void {

    const currentTokens = user.fcmTokens || {}

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('users').doc(user.id)
      const tokens = { ...currentTokens, [token]: true }
      userRef.update({ fcmTokens: tokens })
    }
  }
}