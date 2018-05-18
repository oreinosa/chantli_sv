import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Subject, Observable } from 'rxjs';
import { User } from '../shared/classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireFunctions } from 'angularfire2/functions';
@Injectable()
export class MessagingService {

  private messaging = firebase.messaging();

  private messageSource = new Subject()
  currentMessage = this.messageSource.asObservable() // message observable to show in Angular component

  constructor(private afs: AngularFirestore, private http: HttpClient, private functions: AngularFireFunctions) { }
  // get permission to send messages
  getPermission(user: User) {
    this.messaging
      .requestPermission()
      .then(() => {
        // console.log('Notification permission granted.');
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
          // console.log('Token refreshed.');
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

  subscribeToTopic(topic: string, tokens: any): Observable<any> {
    // let url = 'https://us-central1-chantlisv-dev.cloudfunctions.net/subscribeToTopic';
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let subscribeToTopicFunc = this.functions.httpsCallable("subscribeToTopic");
    return subscribeToTopicFunc({
      topic: topic,
      tokens: tokens
    });
    // let params = {
    //   topic: topic,
    //   tokens: tokens
    // }
    // return this.http.post(url, params, { headers: headers })
    //   .toPromise()
    //   .then(a => console.log(a))
    //   .catch(e => console.error(e));
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